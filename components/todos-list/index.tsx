import TodoItem from "../todo-item";
import { selectFilteredTodos, selectTodos } from "../../features/todos/todosSlice";
import { useSelector } from "react-redux";

const TodosList = () => {

    const todos = useSelector(selectFilteredTodos);
    const todoItems = todos.map(todo => {
        return (<TodoItem {...todo!} key={todo!.id}/>);
    });

    return (
        <div className="flex flex-col justify-start gap-y-2 max-h-[60vh] overflow-auto pr-2" 
        id="todoList">
            {todoItems.length ? todoItems : 
            <span className="text-gray-600 text-center">No todo items</span>}
        </div>
    );
}

export default TodosList;