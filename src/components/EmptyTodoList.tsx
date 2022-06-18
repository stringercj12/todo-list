import styles from './EmptyTodoList.module.css'
import emptyTaskImg from '../assets/task.svg';

export function EmptyTodoList() {
  return (
    <div className={styles.emptyTodoList}>
      <img src={emptyTaskImg} alt="" />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <small>Crie tarefas e organize seus itens a fazer</small>
    </div>
  )
}