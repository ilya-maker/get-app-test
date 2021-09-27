import { fork, all, put } from 'redux-saga/effects'
import { setTodos } from '../action-creators';

export function* fetchTodos() {
    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos)
    const dateNow = Date.now()

    const checkedTodos = parsedTodos.map(todo => dateNow >= todo.time
        ? {
            ...todo,
            isOver: true,
        }
        : todo
    )
    yield put(setTodos(checkedTodos))
}

export function* watchFetchTodos() {
    yield all([
        fork(fetchTodos),
    ])
}