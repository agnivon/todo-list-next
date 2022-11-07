import React from "react";

const TodosContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col flex-1 border border-gray-800 rounded-md py-8 px-4 space-y-6">
            {children}
        </div>
    )
}

export default TodosContainer;