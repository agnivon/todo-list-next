import { CSSProperties, MouseEventHandler } from "react";
import { useSelector } from "react-redux";
import { availableColors, capitalize } from "../../features/filters/colors";
import { colorFilterChanged, colorFilterSelector, statusFilterChanged, StatusFilters, statusFilterSelector } from "../../features/filters/filtersSlice";
import { allTodosCompleted, completedTodosCleared } from "../../features/todos/todosSlice";
import { useAppDispatch } from "../../store";
import styles from './todos-toolbar.module.css';

const TodosToolbarActions = () => {

    const dispatch = useAppDispatch();

    return (
        <div className="grid grid-cols-1 gap-y-3 w-3/4">
            <TodosToolbarHeading text="Todo Actions" />
            <TodosToolbarButton label="Mark All Completed"
                clickHandler={() => dispatch(allTodosCompleted())} />
            <TodosToolbarButton label="Clear Completed"
                clickHandler={() => {
                    dispatch(completedTodosCleared())
                }} />
        </div>
    );
}

const TodosToolbarStatusFilter = () => {
    return (
        <div className="grid grid-cols-1 gap-y-3 w-3/4">
            <TodosToolbarHeading text="Filter By Status" />
            <TodoToolbarStatusFilterButton label={StatusFilters.All} />
            <TodoToolbarStatusFilterButton label={StatusFilters.Active} />
            <TodoToolbarStatusFilterButton label={StatusFilters.Completed} />
        </div>
    );
}

const TodoToolbarStatusFilterButton = ({ label }: { label: string }) => {

    const dispatch = useAppDispatch();

    const statusFilterValue = useSelector(statusFilterSelector);
    const isActive = statusFilterValue === label;

    return (
        <TodosToolbarButton label={capitalize(label)} className={`${isActive ? "border" : ""}`}
            clickHandler={() => dispatch(statusFilterChanged(label))} />
    );
}

const TodosColorFilterOption = ({ color }: { color: string }) => {

    const dispatch = useAppDispatch();
    const colorsSelected = useSelector(colorFilterSelector);
    const isActive = colorsSelected.includes(color);

    return (
        <div className="flex items-center space-x-3 pl-5"
            onClick={() => dispatch(colorFilterChanged(color, isActive ? 'removed' : 'added'))}
            style={{
                cursor: 'pointer'
            }}>
            <div className="flex justify-center items-center">
                <input
                    type="checkbox"
                    className="h-4 w-4 rounded text-indigo-600"
                    checked={isActive}
                />
            </div>
            <span className={`${styles[color]} w-5 h-5`}></span>
            <span className="">{capitalize(color)}</span>
        </div>
    )
}

const TodosToolbarColorFilter = () => {
    return (
        <div className="grid grid-cols-1 gap-y-3 w-3/4">
            <TodosToolbarHeading text="Filter by Color" />
            {availableColors.map(color => {
                return (
                    <TodosColorFilterOption color={color} key={color} />
                );
            })}
        </div>
    );
}

const TodosToolbarHeading = ({ text }: { text: string }) => {
    return (<h1 className="text-xl font-semibold text-center">{text}</h1>)
}

const TodosToolbarButton = ({ label, style, className, clickHandler }: { label: string, style?: CSSProperties, className?: string, clickHandler?: MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <button className={"border-gray-500 hover:border " + className}
            style={style} onClick={clickHandler}>
            {label}
        </button>
    );
}

const TodosToolbar = () => {
    return (
        <div className="grid grid-cols-3 items-start justify-self-end">
            <TodosToolbarActions />
            <TodosToolbarStatusFilter />
            <TodosToolbarColorFilter />
        </div>
    );
}

export default TodosToolbar;