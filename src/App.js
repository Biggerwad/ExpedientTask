import React, { useState } from 'react';
import './App.css';

import styled from 'styled-components'

const Container = styled.div`
  padding: 2rem;
  display: flex;
  width: 70vw;
  margin: 0 auto;
  background-color:#9999ff;
  align-items: center;
  flex-direction: column;
  `;
const Button = styled.button`
  display:inline-block;
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  height: 30px;
  width: 50px;
  border-radius: 2px;
  cursor: pointer;
`;
const Text = styled.input`
  border: 2px solid #000;
  padding: 0 1rem;
`;
const TaskCount = styled.span`
  margin: 10px;
`;
const Tasks = styled.div`
`;
const LIST = styled.li`
    listStyle:"none";
    text-decoration: "line-through";
`;


function App() {
  const [input, setInput] = useState('');
  const [todolist, setTodoList] = useState([]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  const handleClick = () => {
    const id = todolist.length + 1;
    setTodoList((prev) => [...prev, {
      id: id,
      task: input,
      complete: false,
    }
    ]);

    setInput("");
  }

  const handleCompleted = (id) => {

    // Loop through and Check if the id is the same as teh one being mentioned
    // Then increment completed task, AND SET the complete flag to counter-current status
    // else return the previous State of the object.
    const list = todolist.map((task) => {
      let item = {};

      if (task.id == id) {
        if (!task.complete) {
          setCompletedTaskCount(completedTaskCount + 1)
        } else {
          setCompletedTaskCount(completedTaskCount - 1)
        }
        item = { ...task, complete: !task.complete };

      } else item = { ...task };

      return item;
    });
    setTodoList(list);
  };

  return (
    <div className="App">
      <Container>
        <div>
          <h2 className='h2'>Todo List</h2>
          <Text onInput={(e) => { setInput(e.target.value) }} value={input}
            onKeyDown={(e) => {
              { e.key == "Enter" && handleClick() }
            }}
          />
          <Button onClick={() => handleClick()}>Add</Button>


          <Tasks className='status'>
            <TaskCount>
              <b>completed Tasks = {completedTaskCount}</b>
            </TaskCount>
          </Tasks>

          <div>
            <ul>
              {todolist.map((todo) => {
                return (
                  <LIST
                    complete={todo.complete}
                    id={todo.id}
                    onClick={() => { handleCompleted(todo.id) }}
                    style={{
                      listStyle: "none",
                      textDecoration: todo.complete && "line-through",
                    }}
                  >
                    {todo.task}
                  </LIST>
                )
              })}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
