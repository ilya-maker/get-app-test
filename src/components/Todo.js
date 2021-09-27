import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Col, Row, Switch, Tooltip, Button } from 'antd';
import { CloseOutlined, CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styles from '../assets/styles.module.css';
import { changeTodoStatus, deleteTodo, todoExpired } from '../store/action-creators';
import Countdown from "react-countdown";

import TodoChangeModal from './TodoChangeModal';

export default function Todo({ todo }) {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  return (
    <Card className={`${styles.todo} 
      ${todo.completed ? styles.todo__completed : ''}
      ${!todo.completed && todo.isOver ? styles.todo__over : ''}
    `}>
      <Row>
        <Col span={2}>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={todo.completed}
            onChange={() => dispatch(changeTodoStatus({ todo }))}
          />
        </Col>
        <Col span={2}>
          <Countdown date={todo.time} onComplete={() => dispatch(todoExpired(todo))}/>
        </Col>
        <Col span={15} offset={2} className={styles.todo__text}>
          {todo.text}
        </Col>
        <Col span={3}>
          <Row justify="space-between">
            <Col span={12}>
              <Tooltip title="Delete">
                <Button
                  onClick={() => dispatch(deleteTodo({ todo }))}
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Col>
            <Col span={10}>
              <Tooltip title="Change">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => setVisible(true)}
                />
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
      <TodoChangeModal visible={visible} handleChangeVisible={setVisible} todo={todo} />
    </Card>
  )
}