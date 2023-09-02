import { useState, useMemo } from "react";
import {createPortal} from "react-dom";
import uniqid from "uniqid";

import PlusIcon from "../icons/plus";
import { Id, Column } from "../types";
import ColumnContainer from "./ColumnContainer";

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensors, useSensor } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";



export default function KanbanBoard() {

    const [columns, setColumns] = useState<Column[]>([]);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
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
    }

    function onDragStart(event: DragStartEvent) {
        console.log("Drag Start", event);
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
        }
    }

    function onDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over) return;

        const activeColumnId = active.id;
        const overColumnId = over.id;

        if (activeColumnId === overColumnId) return;

        setColumns(columns => {
            const activeColumnIdAfter = columns.findIndex(col => col.id === activeColumnId);
            const overColumnIdAfter = columns.findIndex((col) => col.id === overColumnId);

            return arrayMove(columns, activeColumnIdAfter, overColumnIdAfter);
        })
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
                onDragEnd={onDragEnd}>

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
                                columns.map(col => <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn} /> )
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
                    deleteColumn={deleteColumn} />
                    }
                </DragOverlay>
                    ,document.body)
                }
                
                </DndContext>
            </div>
        </>
    );
}