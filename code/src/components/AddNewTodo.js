/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styled from 'styled-components/macro'
import { useDispatch } from 'react-redux';
import todos from 'reducers/todos';

const AddTodo = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim().length > 0) {
      const newTodo = { id: Date.now().toString(),
        name: inputValue,
        isCaught: false }
      dispatch(todos.actions.addItem(newTodo));
      setInputValue('');
    }
  }

  return (
    <form onSubmit={onFormSubmit}>
      <input
        id="new-todo"
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Type challenge here...🖊️"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)} />
      <label htmlFor="new-todo" />
      <AddTodoButtonStyled className="btn btn-primary mb-2" type="submit"> Add new challenge</AddTodoButtonStyled>
      <CompletedQuestionStyled>Is this done?</CompletedQuestionStyled>
    </form>
  )
}

export default AddTodo;

const AddTodoButtonStyled = styled.button`
right:0;
`

const CompletedQuestionStyled = styled.h4`
margin: 18px 0 21px 0;
`