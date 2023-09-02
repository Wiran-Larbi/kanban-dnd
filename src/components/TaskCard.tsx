import { useState } from "react";
import TrashIcon from "../icons/trash";
import { Id, Task } from "../types";

interface TaskCardProps {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

export default function TaskCard(props: TaskCardProps) {
    
    const { task, deleteTask, updateTask } = props;
    const [mouseOver, setMouseOver] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    function toggleEditMode() {
        setEditMode((prev) => !prev);
        setMouseOver(false);
    }

    if (editMode) {

        return (
            <div 
            id="task"
            className="
            relative
            p-2.5
            h-[100px]
            min-h-[100px]
            flex
            items-center
            text-left
            rounded-xl
            bg-mainBackgroundColor
            hover:ring-2
            hover-ring-inset
            hover:ring-rose-500
            transition-color
            ease-in-out
            duration-200
            cursor-text
            ">
                <textarea 
                value={task.content}
                autoFocus
                placeholder="What's your task ?"
                onBlur={toggleEditMode}
                onKeyDown={event => {
                    if (event.key === "Enter" && event.shiftKey)
                        toggleEditMode();
                }}
                onChange={event => {
                    updateTask(task.id, event.target.value)
                }}
                className="
                h-[95%]
                w-full
                resize-none
                border-none
                bg-transparent
                text-white
                focus:outline-none
                "></textarea>
            </div>
        );
    }
    
    return (
        <div
        id="task"
        onClick={toggleEditMode} 
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        className="
        relative
        p-2.5
        h-[100px]
        min-h-[100px]
        flex
        items-center
        text-left
        rounded-xl
        bg-mainBackgroundColor
        hover:ring-2
        hover-ring-inset
        hover:ring-rose-500
        transition-color
        ease-in-out
        duration-200
        cursor-grab
        ">
            <p className="
            mx-auto
            h-[90%]
            w-full
            overflow-y-auto
            overflow-x-hidden
            whitespace-pre-wrap
            ">
            {task.content}
            </p>
            {
                mouseOver
                &&

            <button 
            onClick={() => deleteTask(task.id)}
            className="
            p-2
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            stroke-gray-400
            hover:stroke-white
            transition-color
            ease-in-out
            duration-300
            rounded
            ">
                <TrashIcon />
            </button>
            }
        </div>
    );
}