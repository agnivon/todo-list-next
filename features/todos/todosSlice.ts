import {
    createSlice,
    createSelector,
    createEntityAdapter,
    PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { StatusFilters } from '../filters/filtersSlice';

export interface TodoItem {
    id: number
    description?: string
    completed?: boolean
    color?: string
}

const todosAdapter = createEntityAdapter<TodoItem>();

const initialState = todosAdapter.getInitialState({
    status: 'idle',
});

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdded(state, action: PayloadAction<TodoItem>) {
            const todo = action.payload
            state.entities[todo.id] = todo
        },
        todoToggled(state, action: PayloadAction<number>) {
            const todoId = action.payload
            const todo = state.entities[todoId]!
            todo.completed = !todo.completed
        },
        todoColorSelected: {
            reducer(state, action: PayloadAction<{ todoId: number, color: string }>) {
                const { color, todoId } = action.payload
                state.entities[todoId]!.color = color
            },
            prepare(todoId: number, color: string) {
                return {
                    payload: { todoId, color }
                }
            }
        },
        todoDeleted: todosAdapter.removeOne,
        allTodosCompleted(state) {
            Object.values(state.entities).forEach((todo) => {
                todo!.completed = true
            })
        },
        completedTodosCleared(state) {
            const completedIds = Object.values(state.entities)
                .filter(todo => todo!.completed)
                .map(todo => todo!.id)
            todosAdapter.removeMany(state, completedIds)
        }
    }
});

export const {
    allTodosCompleted,
    completedTodosCleared,
    todoAdded,
    todoColorSelected,
    todoDeleted,
    todoToggled
} = todosSlice.actions

export default todosSlice.reducer

export const { selectAll: selectTodos, selectById: selectTodoById } =
    todosAdapter.getSelectors((state: RootState) => state.todos);
    
export const ownSelectTodos = (state: RootState) => Object.values(state.todos.entities);

export const selectTodoIds = createSelector(
    // First, pass one or more "input selector" functions:
    ownSelectTodos,
    // Then, an "output selector" that receives all the input results as arguments
    // and returns a final result value
    todos => todos.map(todo => todo!.id)
);

export const selectFilteredTodos = createSelector(
    // First input selector: all todos
    ownSelectTodos,
    // Second input selector: all filter values
    (state: RootState) => state.filters,
    // Output selector: receives both values
    (todos, filters) => {
        const { status, colors } = filters;
        const showAllCompletions = status === StatusFilters.All;
        if (showAllCompletions && colors.length === 0) {
            return todos;
        }

        const completedStatus = status === StatusFilters.Completed
        // Return either active or completed todos based on filter
        return todos.filter(todo => {
            const statusMatches =
                showAllCompletions || todo!.completed === completedStatus
            const colorMatches = colors.length === 0 || colors.includes(todo!.color!)
            return statusMatches && colorMatches
        });
    }
);

export const selectFilteredTodoIds = createSelector(
    // Pass our other memoized selector as an input
    selectFilteredTodos,
    // And derive data in the output selector
    filteredTodos => filteredTodos.map(todo => todo!.id)
);