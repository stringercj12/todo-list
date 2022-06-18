import { CheckCircle, Circle, Trash } from 'phosphor-react';
import styles from './Task.module.css'

export interface TaskProps {
  id: number;
  content: string;
  publishedAt: Date;
  isDone: boolean;
}

interface Props {
  task: TaskProps;
  onDeleteTask: (task: TaskProps) => void;
  onDoneTask: (task: TaskProps) => void;
}

export function Task({ task, onDeleteTask, onDoneTask }: Props) {

  function handleDoneTask() {
    onDoneTask(task)
  }

  function handleDeleteTask() {
    onDeleteTask(task)
  }


  return (
    <div className={styles.task}>
      <button onClick={handleDoneTask} className={styles.taskButton}>
        {task.isDone ?
          <span className={styles.taskIsDone}>
            <CheckCircle size={18} />
          </span>
          :
          <span className={styles.taskIsNotDone}>
            <Circle size={18} />
          </span>
        }
        <div className={task.isDone ? styles.taskContentDone : styles.taskContent}>
          {task.content}
        </div>
      </button>
      <div>
        <button className={styles.taskButtonDelete} onClick={handleDeleteTask}>
          <Trash size={20} />
        </button>
      </div>
    </div>
  )
}