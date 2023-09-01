import { useState } from "react";
import uniqid from "uniqid";

import PlusIcon from "../icons/plus";
import { Id, Column } from "../types";
import ColumnContainer from "./ColumnContainer";



export default function KanbanBoard() {

    const [columns, setColumns] = useState<Column[]>([]);

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
                            {
                                columns.map(col => <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn} /> )
                            }
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
            </div>
        </>
    );
}