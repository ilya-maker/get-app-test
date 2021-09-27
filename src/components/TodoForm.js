import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button, Row, Col, TimePicker } from 'antd';
import { addTodo } from '../store/action-creators';
import styles from '../assets/styles.module.css';

export default function TodoForm() {
  const [text, setText] = useState('');
  const [time, setTime] = useState(null);
  const dispatch = useDispatch()

  const handleAddTodo = () => {
    dispatch(addTodo({
      text: text.trim(),
      time: time,
      successfulCallback: clearFields 
    }))
  }

  const clearFields = () => {
    setText('')
    setTime(null)
  }

  return (
    <Row className={styles.form}>
      <Col span={4}>
        <TimePicker
          format='HH:mm'
          onChange={(e) => setTime(e)}
          value={time}
        />
      </Col>
      <Col span={16}>
        <Input
          placeholder="Enter your todo"
          onChange={e => setText(e.target.value)}
          value={text}
        />
      </Col>
      <Col offset={1} span={3}>
        <Button onClick={handleAddTodo} type="primary">Add Todo</Button>
      </Col>
    </Row>
  )
}