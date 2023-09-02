import { useState, useMemo } from "react";
import {createPortal} from "react-dom";
import uniqid from "uniqid";

import PlusIcon from "../icons/plus";
import { Id, Column, Task } from "../types";
import ColumnContainer from "./ColumnContainer";

import { DndContext, DragEndEvent, DragOverlay, DragOverEvent,  DragStartEvent, PointerSensor, useSensors, useSensor } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";



export default function KanbanBoard() {

    const [columns, setColumns] = useState<Column[]>([]);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const sensors = useSensors(useSensor(PointerSensor,{
        activationConstraint: {
            distance: 1,
        }
    }))
   
    
    function createColumn() {
        const newColumn: Column = {
            id: uniqid(),
            title: `Column ${columns.length + 1}`
        }

        setColumns([...columns, newColumn]);
    }
    function deleteColumn(id: Id) {
        const newColumns = columns.filter((col) => col.id !== id);

        setColumns(newColumns);
        const newTasks = tasks.filter((task) => task.columnId !== id);
        setTasks(newTasks);
    }
    function updateColumn(id: Id, title: string) {
        const newColumns = columns.map(col => {
            if (col.id !== id) return col;
            return {...col,title};
        })

        setColumns(newColumns);
    }

    function createTask(columnId: Id) {
        const newTask: Task = {
            id: uniqid(),
            columnId,
            content: `Task ${tasks.length + 1}`,
        }

        setTasks([...tasks, newTask]);
    }

    function deleteTask(id: Id) {
        const newTasks = tasks.filter(task => task.id !== id );

        setTasks(newTasks);
    }

    function updateTask(id: Id, content: string) {
        const newTasks: Task[] = tasks.map(task => {
            if (task.id !== id)
                return task;
            return {...task, content};
        });

        setTasks(newTasks);
    }

    function onDragStart(event: DragStartEvent) {
        console.log("Drag Start", event);
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {

        setActiveColumn(null);
        setActiveTask(null);
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        setColumns(columns => {
            const activeColumnIdAfter = columns.findIndex(col => col.id === activeId);
            const overColumnIdAfter = columns.findIndex((col) => col.id === overId);

            return arrayMove(columns, activeColumnIdAfter, overColumnIdAfter);
        })
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === "Task";
        const isOverTask = over.data.current?.type === "Task";

        if (!isActiveTask) return;
        // Dropping Task over another task
        if (isActiveTask && isOverTask) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId);
                const overIndex = tasks.findIndex(t => t.id === overId);

                tasks[activeIndex].columnId = tasks[overIndex].columnId;

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverColumn = over.data.current?.type === "Column";
        // Dropping Task over another Column

        if (isActiveTask && isOverColumn) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId);

                tasks[activeIndex].columnId = overId;

                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }

    }

  

    return(
        <>
            <div className="
                mx-auto
                flex
                min-h-screen
                w-full
                items-center
                overflow-x-auto
                overflow-y-hidden
                px-[40px]
            ">
                <DndContext 
                sensors={sensors}
                onDragStart={onDragStart} 
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                >

                <div className="
                    mx-auto
                    flex
                    gap-4
                ">
                    {/** // Created Columns */}
                        <div className="
                            flex
                            gap-4
                        ">
                            <SortableContext items={columnsId}>

                            {
                                columns.map(col => <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn} updateColumn={updateColumn} createTask={createTask} tasks={tasks.filter(task => task.columnId === col.id)} deleteTask={deleteTask} updateTask={updateTask} /> )
                            }
                            </SortableContext>
                        </div>

                <button 
                onClick={() => createColumn()}
                className="
                    flex
                    gap-2
                    h-[60px]
                    w-[350px]
                    min-w-[350px]
                    rounded-lg
                    border-2
                    border-columnBackgroundColor
                    bg-mainBackgroundColor
                    cursor-pointer
                    p-4
                    ring-rose-500
                    hover:ring-2
                    transition-color
                    ease-out
                    duration-300
                    ">
                    <PlusIcon />
                    Add Column
                </button>
                </div>
                {
                    createPortal(
                        <DragOverlay>
                    {
                    activeColumn
                    &&
                    <ColumnContainer 
                    column={activeColumn} 
                    deleteColumn={deleteColumn} 
                    updateColumn={updateColumn}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    tasks={tasks.filter(task => task.columnId === activeColumn.id)}
                    />
                    }
                    {
                    activeTask
                    &&
                    <TaskCard 
                    task={activeTask} 
                    deleteTask={deleteTask} 
                    updateTask={updateTask} />
                    }
                </DragOverlay>
                    ,document.body)
                }
                
                </DndContext>
            </div>
        </>
    );
}