import { FormEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';
import Lottie from 'react-lottie';

import { Header } from './components/Header';
import { Task, TaskProps } from './components/Task';
import { EmptyTodoList } from './components/EmptyTodoList';
import styles from './App.module.css';
import confettiJson from './assets/confetti.json';

import './global.css';

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: confettiJson,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [taskText, setTaskText] = useState('');
  const [errortaskText, setErrorTaskText] = useState('');
  const [totalTaskDone, setTotalTaskDone] = useState(0);
  const [isConfetti, setIsConfetti] = useState(false);

  function handleDeleteTask(taskDelete: TaskProps) {
    let totalTaskDone = 0;
    const newTasksList = tasks.filter(task => {
      if (task.id !== taskDelete.id && task.isDone) {
        totalTaskDone++;
      }

      return task.id !== taskDelete.id;
    });
    setTasks(newTasksList);
    setTotalTaskDone(totalTaskDone);
  }

  async function handleDoneTask(taskSelected: TaskProps) {
    const newTasksList = tasks.map(task => {
      if (task.id === taskSelected.id) {
        task.isDone = !task.isDone;
      }
      return task;
    });


    console.table(tasks.find(task => task.id === taskSelected.id))

    let totalTaskDone = 0;
    tasks.find(task => {
      if (task.isDone) {
        totalTaskDone++;
      }
    });

    if (totalTaskDone === tasks.length) {
      setIsConfetti(true);
    }

    setTasks(newTasksList)

    setTotalTaskDone(totalTaskDone);

    setTimeout(() => {
      setIsConfetti(false)
    }, 5000)

  }

  function handleAddNewTask(event: FormEvent) {
    event.preventDefault();

    if (!taskText) {
      setErrorTaskText('Informe o nome da tarefa');
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      content: taskText,
      publishedAt: new Date(),
      isDone: false
    }

    setTasks((state) => [...state, newTask])
    setErrorTaskText('');
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <main>

          <form className={styles.form} onSubmit={handleAddNewTask}>
            <div>
              <input
                type="text"
                placeholder="Adicione uma nova tarefa"
                value={taskText}
                onChange={e => setTaskText(e.target.value)}
              />
              <small>{errortaskText}</small>
            </div>
            <button type="submit">
              Criar <PlusCircle size={20} weight="bold" />
            </button>
          </form>

          <section className={styles.title}>
            <div className={styles.created}>
              Tarefas criadas
              <span className={styles.badge}>
                {tasks.length}
              </span>
            </div>
            <div className={styles.done}>
              Concluídas
              <span className={styles.badge}>
                {`${totalTaskDone} de `}
                {tasks.length}
              </span>
            </div>
          </section>

          {tasks.length > 0 ?
            tasks.map(task => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  onDeleteTask={handleDeleteTask}
                  onDoneTask={handleDoneTask}
                />
              )
            })
            :
            <EmptyTodoList />
          }
        </main>
        {isConfetti &&

          <div className={styles.confetti}>
            <Lottie
              options={lottieOptions}
              height={400}
              width={400}
            />
          </div>
        }

      </div>
    </div >
  )
}

export default App
