import React, { useState } from 'react';
import './../styles/App.css';

/**

//! Make a button with id="btn" which on click adds the task to the list.

Each item in the list should have a classname "list"

Please ensure to render the task in the sequence they are added for example if a task "Buy milk" is added and then task "Buy vegetable" is added then they should be rendered in the same sequence first "Buy milk" and then "Buy vegetable".

Each task should have edit and delete buttons corresponding to each task with class edit and delete respectively.

There should be a textarea and save button corresponding to each task with class editTask and saveTask respectively which will be conditionally rendered when the edit button is clicked, please trigger onchange instead of using ref in editing task as test cases depend on it.

The edited task should not be saved if the text area contains an empty string at this particular time save button should not be functional.

On save the task should be updated and back to its normal state i.e edit and delete functionality is available.

Initially, the task list should be empty.

**Please use onChange instead of ref for controlled inputs as test cases depend on it.
 */
function ID() {
  let id = 0;
  return function () {
    id++;
    return id;
  };
}

const getNextId = ID();

function ListItem(props) {
  const { children, onModify, onDelete } = props;

  const [isEditMode, setIsEditMode] = useState(false);
  console.log({ isEditMode });
  const [tempTask, setTempTask] = useState(children);

  return isEditMode ? (
    <>
      <textarea
        className="editTask"
        onChange={function (event) {
          setTempTask(event.target.value);
        }}
        value={tempTask}
      ></textarea>
      <button
        className="saveTask"
        type="button"
        disabled={tempTask === ''}
        onClick={function () {
          console.log('save click', tempTask);
          if (tempTask !== '') {
            onModify(tempTask);
            setIsEditMode(false);
          }
        }}
      >
        Save
      </button>
    </>
  ) : (
    <>
      <li className="list" key={children}>
        {children}
      </li>
      <button
        className="edit"
        type="button"
        onClick={function () {
          setIsEditMode(true);
        }}
      >
        Edit
      </button>
      <button
        className="delete"
        type="button"
        onClick={function () {
          onDelete();
        }}
      >
        Delete
      </button>
    </>
  );
}

function App() {
  const [task, setTask] = useState('');
  const [todoList, setTodoList] = useState([]);

  function onModify(givenTask, givenI) {
    console.log({ givenTask, givenI });
    const newList = todoList.map(function (task, i) {
      if (givenI === i) {
        return givenTask;
      }
      return task;
    });
    // console.log(newList === todoList);
    setTodoList(newList);
  }

  function onDelete(givenI) {
    const newList = todoList.filter(function (el, i) {
      return i !== givenI;
    });
    setTodoList(newList);
  }

  return (
    <div id="main">
      <textarea
        id="task"
        onChange={function (event) {
          setTask(event.target.value);
        }}
        value={task}
      ></textarea>
      <button
        id="btn"
        type="button"
        onClick={function () {
          if (task !== '') {
            setTodoList([...todoList, task]);
            setTask('');
          }
        }}
      >
        Add
      </button>

      <h3>Todo Lists</h3>
      <ul>
        {todoList.map((task, i) => {
          return (
            <ListItem
              onModify={(newTask) => {
                onModify(newTask, i);
              }}
              onDelete={() => onDelete(i)}
            >
              {task}
            </ListItem>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
