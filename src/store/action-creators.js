import * as types from './types';

export const addTodo = payload => ({ type: types.ADD_TODO, payload })
export const changeTodo = payload => ({ type: types.CHANGE_TODO, payload })
export const setTodos = payload => ({ type: types.SET_TODOS, payload })
export const changeTodoText = payload => ({ type: types.CHANGE_TODO_TEXT, payload })
export const changeTodoStatus = payload => ({ type: types.CHANGE_TODO_STATUS, payload })
export const deleteTodo = payload => ({ type: types.DELETE_TODO, payload })
export const todoExpired = payload => ({ type: types.TIME_IS_OVER, payload })