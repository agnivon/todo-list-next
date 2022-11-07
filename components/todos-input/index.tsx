import { MouseEventHandler, useState } from "react";
import { todoAdded } from "../../features/todos/todosSlice";
import { useAppDispatch } from "../../store";

const TodosInput = () => {

    const dispatch = useAppDispatch();
    const [taskDescription, setTaskDescription] = useState('');

    const handleNewTask = (event: any) => {
        if ((event.which === 13 || event.type === "click") && taskDescription.length > 0) {
            dispatch(todoAdded({
                id: Date.now(),
                description: taskDescription,
                color: '',
                completed: false
            }));
            setTaskDescription('');
        }
    }

    return (
        <div className="flex flex-1 items-stretch space-x-1">
            <input
                type="text"
                className="flex-1 rounded-l-md bg-gray-800 
                border-0 pl-7 pr-12 focus:border-gray-500 focus:ring-gray-500 text-md"
                placeholder="Enter new task"
                value={taskDescription}
                onChange={(event) => { setTaskDescription(event.target.value) }}
                onKeyDown={handleNewTask}
            />
            <button className="w-36 inline-flex items-center justify-center
             rounded-r-md border-0 border-gray-500 bg-gray-800 px-3 text-sm text-white active:bg-black hover:border"
                onClick={handleNewTask}>
                Create task
            </button>
        </div>
    );
}

export default TodosInput;
