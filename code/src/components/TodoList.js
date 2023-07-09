import React, { useEffect } from 'react';
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux';
import todos from 'reducers/todos';

const TodoList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const listFromStorage = JSON.parse(localStorage.getItem('toDoList'))
    if (listFromStorage) {
      dispatch(todos.actions.setAllItems(listFromStorage))
    }
  }, [dispatch])
  const todoList = useSelector((store) => store.todos.items)
  const onIsDoneToggle = (id) => {
    dispatch(todos.actions.toggleTodoItem(id))
  }
  const onDeleteTodoButtonClick = (todosIndex) => {
    dispatch(todos.actions.deleteTodoItem(todosIndex))
  }
  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(todoList))
  }, [todoList])

  return (
    <>
      {todoList.map((singleTodo, index) => {
        return (
          <EachTaskStyler key={singleTodo.id}>
            <input
              type="checkbox"
              id="checkbox"
              checked={singleTodo.isDone}
              className="strikethrough"
              onChange={() => onIsDoneToggle(singleTodo.id)} />
            <label className="strikethrough" id="strikethrough">{singleTodo.name}
            </label>
            <RemoveButtonStyled onClick={() => onDeleteTodoButtonClick(index)} type="button" className="btn btn-warning">Remove</RemoveButtonStyled>
          </EachTaskStyler>
        );
      })}
    </>
  )
}

export default TodoList;

const EachTaskStyler = styled.div`
margin-bottom: 6%;
margin-left: 26px;
@media (min-width: 667px) {
margin-bottom: 5%;
}

@media (min-width: 1024px) {
margin-bottom: 2.5%;
}
`

const RemoveButtonStyled = styled.button`
  position: absolute;
  right:4vw;
`

