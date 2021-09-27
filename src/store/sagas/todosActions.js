import { put, select, takeEvery } from 'redux-saga/effects'
import * as types from '../types';
import { setTodos } from '../action-creators';
import { message } from 'antd';

const getTodos = (state) => state.todos;

function* checkImpossibleAdd(payload, create) {
    const todos = yield select(getTodos)

    if (create && !payload.time) {
        message.error('Time cannot be empty!');
        return true
    }

    if (!payload.text) {
        message.error('The Todo cannot be empty!');
        return true
    }

    if (todos.find(todo => todo.text === payload.text)) {
        message.error('Todo cannot have the same name!');
        return true
    }

    return false
}

export function* createTodo({ payload }) {
    if (yield checkImpossibleAdd(payload, true)) {
        return;
    }

    const todos = yield select(getTodos)

    const time = payload.time;
    const timeNow = Date.now();
    const timeInTimestamp = (time.hours() * 60 * 60 * 1000) + (time.minutes() * 60 * 1000)

    const todo = {
        time: timeNow + timeInTimestamp,
        id: timeNow,
        completed: false,
        text: payload.text
    }
    payload.successfulCallback()
    yield put(setTodos([todo, ...todos]))
}

export function* changeStatus({ payload }) {
    const todos = yield select(getTodos)

    const newTodos = todos.map(todo => todo.id === payload.todo.id
        ? {
            ...todo,
            completed: !todo.completed,
        }
        : todo)

    yield put(setTodos(newTodos))

}

export function* changeText({ payload }) {
    if (yield checkImpossibleAdd(payload)) {
        return;
    }

    const todos = yield select(getTodos)

    const newTodos = todos.map(todo => todo.id === payload.todo.id
        ? {
            ...todo,
            text: payload.text,
        }
        : todo)

    yield put(setTodos(newTodos))
}

export function* timeIsOver({ payload }) {
    const todos = yield select(getTodos)

    if (payload.completed) {
        message.success('Todo completed on time!');
    } else {
        message.error('Todo not completed on time!');
    }

    const newTodos = todos.map(todo => todo.id === payload.id
        ? {
            ...todo,
            isOver: true,
        }
        : todo)

    yield put(setTodos(newTodos))
}

export function* deleteTodo({ payload }) {
    const todos = yield select(getTodos)

    const newTodos = todos.filter(todo => todo.id !== payload.todo.id)

    yield put(setTodos(newTodos))
}

export function saveTodos({ payload }) {
    localStorage.setItem('todos', JSON.stringify(payload));
}

export function* watchActionTodo() {
    yield takeEvery(types.SET_TODOS, saveTodos)
    yield takeEvery(types.ADD_TODO, createTodo)
    yield takeEvery(types.CHANGE_TODO_STATUS, changeStatus)
    yield takeEvery(types.CHANGE_TODO_TEXT, changeText)
    yield takeEvery(types.TIME_IS_OVER, timeIsOver)
    yield takeEvery(types.DELETE_TODO, deleteTodo)
}