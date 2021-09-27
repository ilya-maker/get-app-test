import { List } from 'antd';
import { useSelector } from 'react-redux';
import Todo from './Todo';

export default function TodoList() {
  const todos = useSelector(state => state.todos);

  return (
    <List>
      {todos.length
        ? todos.map(todo => (
          <List.Item key={todo.id}>
            <Todo todo={todo} />
          </List.Item>
        ))
        : ''
      }
    </List>
  )
}