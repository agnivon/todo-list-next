import { availableColors, capitalize } from '../../features/filters/colors';
import { todoColorSelected, todoDeleted, TodoItem, todoToggled } from '../../features/todos/todosSlice';
import { useAppDispatch } from '../../store';

import styles from '../todos-toolbar/todos-toolbar.module.css';

const TodoItemCheckbox = ({ id, completed }: { id: number, completed: boolean }) => {

    const dispatch = useAppDispatch();
    const handleTodoToggled = () => dispatch(todoToggled(id));

    return (
        <div className="w-12 flex justify-center items-center" style={{
            cursor: "pointer"
        }} onClick={handleTodoToggled}>
            <input
                type="checkbox"
                className="h-6 w-6 rounded-full text-indigo-600 focus:ring-indigo-500"
                checked={completed}
            />
        </div>
    );
}

const TodoItemInput = ({ id, description }: { id: number, description: string }) => {

    const dispatch = useAppDispatch();

    return (
        <div className="flex-1 flex items-center" style={{
            cursor: "pointer"
        }} onClick={() => dispatch(todoToggled(id))}>
            {/* <input
                type="text"
                className="block h-full bg-black border-0 pl-4 pr-12 focus:border-gray-500 focus:ring-gray-500 text-md"
                value={description}
                disabled
            /> */}
            <span className="text-lg">{description}</span>
        </div>
    )
}

const TodoItemColorDropdown = ({ id, color }: { id: number, color: string }) => {

    const dispatch = useAppDispatch();

    return (
        <div className="flex items-center">
            <select className="w-28 h-6 py-0 px-1 rounded-md border
             border-gray-800 bg-black shadow-sm 
             focus:border-indigo-500 focus:outline-none 
             focus:ring-indigo-500 text-sm"
                onChange={(event) => dispatch(todoColorSelected(id, event.target.value))}
                value={color}>
                <option selected hidden>Unassigned</option>
                {availableColors.map(color => {
                    return (<option value={color}>{capitalize(color)}</option>)
                })}
            </select>
        </div>
    );
}

const TodoItemDeleteButton = ({ id }: { id: number }) => {

    const dispatch = useAppDispatch();

    return (
        <div className="w-12 flex justify-center items-center">
            <button onClick={() => dispatch(todoDeleted(id))}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    )
}

const TodoItem = (todo: TodoItem) => {

    return (
        <div className={`h-12 flex shrink-0 items-stretch rounded-md 
        border=0 hover:border border-gray-700`}>
            <TodoItemCheckbox completed={todo.completed!} id={todo.id} />
            <TodoItemInput description={todo.description!} id={todo.id} />
            <TodoItemColorDropdown id={todo.id} color={todo.color!} />
            <TodoItemDeleteButton id={todo.id} />
        </div>
    );
}

export default TodoItem;
