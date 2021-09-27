import { Layout } from 'antd';
import styles from './assets/styles.module.css';

// Components
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {

  return (
    <div className="App">
      <Layout>
        <Layout.Content className={styles.content}>
          <TodoForm />
          <TodoList />
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
