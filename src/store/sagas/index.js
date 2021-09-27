import { spawn } from 'redux-saga/effects';
import { watchActionTodo } from './todosActions';
import { watchFetchTodos } from './todosFetch';

export function* rootWatcher() {
    yield spawn(watchActionTodo)
    yield spawn(watchFetchTodos)
}