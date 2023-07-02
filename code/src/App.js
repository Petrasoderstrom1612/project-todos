import React from 'react';
import styled from 'styled-components/macro'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todos from 'reducers/todos';
import TodoList from 'components/TodoList';
import AddNewTodo from 'components/AddNewTodo';
import TotalItems from 'components/TotalItems';

export const App = () => {
  const reducers = combineReducers({
    todos: todos.reducer
  })
  const store = configureStore({
    reducer: reducers
  })
  return (
    <Provider store={store}>
      <OuterWrapper>
        <h2>Honza&apos;s challenges💍</h2>
        <AddNewTodo />
        <TodoList />
        <TotalItems />
      </OuterWrapper>
    </Provider>
  );
}

const OuterWrapper = styled.div`
position: relative;
  min-width: 96vw;
  width: 96%;
  min-height: 94vh;
  margin-left: 2%;
  margin-top: 3vh;

  @media (min-width: 667px) {
  min-width: 90vw;
  width: 90%;
  margin-left:5%;
}

@media (min-width: 1024px) {
  min-width: 80vw;
  width: 80%;
  margin-left:10%;
}
`
