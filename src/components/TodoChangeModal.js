import { Modal, Input } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeTodoText } from '../store/action-creators';

export default function TodoChangeModal({
  visible,
  handleChangeVisible,
  todo
}) {
  const dispatch = useDispatch()
  const [text, setText] = useState(todo.text);

  useEffect(() => {
    setText(todo.text)
  }, [visible, todo.text])

  const handleOk = () => {
    dispatch(changeTodoText({ text, todo }))
    handleChangeVisible(false)
  };

  const handleCancel = () => {
    handleChangeVisible(false)
  };

  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Enter your todo"
        onChange={e => setText(e.target.value)}
        value={text}
      />
    </Modal>
  );
}