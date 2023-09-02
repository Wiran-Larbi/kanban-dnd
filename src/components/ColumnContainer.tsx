import { useMemo, useState } from "react";
import TrashIcon from "../icons/trash";
import { Id, Column, Task } from "../types";
// import { useSortable } from "@dnd-kit/sortable/dist/hooks";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext } from "@dnd-kit/sortable";
import { CSS }from "@dnd-kit/utilities";
import ColumnInput from "./ColumnInput";
import PlusIcon from "../icons/plus";
import TaskCard from "./TaskCard";


interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;

    tasks: Task[];
    createTask: (columnId: Id) => void;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;

}


export default function ColumnContainer(props: Props) {
    const [editMode, setEditMode] = useState<boolean>(false);

    const { column, deleteColumn, updateColumn, tasks, createTask, deleteTask, updateTask } = props;
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
        disabled: editMode
    });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }
    const tasksIds = useMemo(() => tasks.map(task => task.id), [tasks]);

    if (isDragging) {
        return (
            <div
            ref={setNodeRef}
            style={style}
            className="
            flex
            flex-col
            w-[350px]
            h-[500px]
            max-h-[500px]
            bg-mainBackgroundColor
            border-2
            border-rose-500
            opacity-90
            transition-color
            rounded-md"
            /> );
    }

    return (
        <div 
        ref={setNodeRef}
        style={style}
        className="
        flex
        flex-col
        w-[350px]
        h-[500px]
        max-h-[500px]
        bg-columnBackgroundColor
        rounded-md
        ">
            {/* Column Title */}
        <div
        onClick={() => setEditMode(true)}
        {...attributes}
        {...listeners}
        className="
        h-[60px]
        p-3
        flex
        items-center
        justify-between
        font-bold
        text-md
        bg-mainBackgroundColor
        rounded-md
        rounded-b-none
        border-columnBackgroundColor
        border-4
        ">
            <div className="
            flex
            gap-2
            ">

                <div className="
                px-2
                py-1
                text-sm
                flex
                justify-center
                items-center
                bg-columnBackgroundColor
                rounded-full
                ">
                    0
                </div>
                {!editMode && column.title}
                {editMode && <ColumnInput id={column.id} title={column.title} onEdit={setEditMode} updateColumn={updateColumn} />}
            </div>
            <button 
            onClick={() => deleteColumn(column.id)}
            className="
                px-1
                py-2
                stroke-gray-400
                hover:stroke-white
                rounded
                transition-color
                ease-in-out
                duration-200
            ">
                <TrashIcon />
            </button>   

        </div>
            {/* Column Task Container */}
            <div className="
            p-2
            flex 
            flex-grow
            flex-col
            gap-4
            overflow-x-hidden
            overflow-y-auto
            ">
                <SortableContext items={tasksIds}>
                {tasks.map(task => (
                    // <div key={task.id}>{task.content}</div>
                    <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
                ))}
                </SortableContext>
            </div>

            <button 
            onClick={() => createTask(column.id)}
            className="
            p-4
            flex
            gap-2
            items-center
            border-columnBackgroundColor
            border-x-columnBackgroundColor
            border-2
            rounded-md
            hover:bg-mainBackgroundColor
            hover:text-rose-500
            active:bg-black
            transition-color
            ease-in-out
            duration-300
            ">
                <PlusIcon />
                Add Task
            </button>
        </div>
    );
}