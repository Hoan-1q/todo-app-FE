import React from 'react';
import { Button, Col, Collapse, Input, Layout, Modal, Row } from 'antd';
import axios from 'axios';
import TodoItem from '../components/TodoItem';
import router from 'next/router';

import styles from '../styles/Home.module.css'

const { Content } = Layout;

function App() {

  const [todoList, setTodoList] = React.useState([]) as any[];
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenDelete, setIsOpenDelete] = React.useState(false);
  const [valueTodo, setValueTodo] = React.useState() as any;
  const [id, setId] = React.useState() as any;

  React.useEffect(() => {
    async function fetchMyAPI() {
      const res = await axios.get(
        'http://localhost:3000/todo/all',
      );
      if (res.status === 200) {
        if(res.data.lenght > 1) {
          const dataSort =  res.data.sort((a: any, b: any) => (new Date(a.date).getDate() - new Date(b.date).getDate()));
          console.log(dataSort);
          setTodoList(dataSort);
        } else {
          setTodoList(res.data);
          console.log(res.data);
        }
      }
    }
    fetchMyAPI();
  }, []);

  const onActionOk = async () => {
    // const { id, title, description, done, prority, date } = valueTodo;
    valueTodo.done = !valueTodo.done;
    const res = await axios.put(
      `http://localhost:3000/todo/${valueTodo.id}`,
      valueTodo
    );
    if (res.status === 200) {
      setIsOpen(false);
    }
  }

  const onActionOkDelete = async () => {
    const newValue = todoList.filter((todo: any) => todo.id !== id);
    setTodoList(newValue)
    const res = await axios.delete(
      `http://localhost:3000/todo/${id}`,
      valueTodo
    );
    console.log(res);
    if (res.status === 200) {
      setIsOpenDelete(false);
    }
  }


  const toggleDone = async (value: any) => {
    setIsOpen(!isOpen);
    setValueTodo(value);
  }

  const onRemove = async (id: number) => {
    setIsOpenDelete(!isOpenDelete);
    setId(id);
  }

  const onChangeFind = async (value: string) => {
    router.push({
      pathname: '/',
      query: {
        search: `${value}`
      },
    })
    const res = await axios.get(
      `http://localhost:3000/todo/?search=${value}`,
    );
    setTodoList(res.data);
  }

  return (
    <div className={styles.container}>
      <Layout style={{ padding: '24px 0' }}>
        <Content style={{ padding: '0 50px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }} >
            <h3>Todo list</h3>
            <Button style={{ right: '-21.5%' }} onClick={() => router.push('task/new')}  >Add</Button>
          </div>
          <Row>
            <br />
            <Col span={12} offset={6}>
              <Input placeholder="Search..." onChange={(event) => onChangeFind(event.target.value)} />
            </Col>
            <br />
            {todoList.length > 0 && todoList.map((todo: any) => (
              <Col span={12} offset={6} key={todo.id}>
                <TodoItem data={todo} toggleDone={toggleDone} onRemove={onRemove} />
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
      <Modal title="" visible={isOpen} onOk={onActionOk} onCancel={() => setIsOpen(false)}>
        <p>Action ?</p>
      </Modal>
      <Modal title="" visible={isOpenDelete} onOk={onActionOkDelete} onCancel={() => setIsOpenDelete(false)}>
        <p>Action ?</p>
      </Modal>
    </div>
  )
}

export default App
