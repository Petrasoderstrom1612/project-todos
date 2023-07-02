/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import todos from 'reducers/todos';

const TodoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((store) => store.todos.items);

  useEffect(() => {
    const db = firebase.firestore();
    const todosCollectionRef = db.collection('todos');

    const fetchData = async () => {
      const snapshot = await todosCollectionRef.get();
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        isDone: doc.data().isDone
      }));
      dispatch(todos.actions.setAllItems(todosData));
    };

    fetchData();
  }, [dispatch]);

  const onIsDoneToggle = (id) => {
    dispatch(todos.actions.toggleTodoItem(id));
  };

  const onDeleteTodoButtonClick = async (todosIndex) => {
    const db = firebase.firestore();
    const todoToDelete = todoList[todosIndex];
    await db.collection('todos').doc(todoToDelete.id).delete();
    dispatch(todos.actions.deleteTodoItem(todosIndex));
  };

  useEffect(() => {
    const db = firebase.firestore();
    const todosCollectionRef = db.collection('todos');

    const updateTodoList = async () => {
      const batch = db.batch();
      todoList.forEach((todo) => {
        const docRef = todosCollectionRef.doc(todo.id);
        batch.update(docRef, { isDone: todo.isDone });
      });
      await batch.commit();
    };

    updateTodoList();
  }, [todoList]);

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
              onChange={() => onIsDoneToggle(singleTodo.id)}
            />
            <label className="strikethrough" id="strikethrough">
              {singleTodo.name}
            </label>
            <RemoveButtonStyled
              onClick={() => onDeleteTodoButtonClick(index)}
              type="button"
              className="btn btn-warning"
            >
              Remove
            </RemoveButtonStyled>
          </EachTaskStyler>
        );
      })}
    </>
  );
};

export default TodoList;

const EachTaskStyler = styled.div`
margin-bottom: 6%;
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

