import TrashIcon from "../icons/trash";
import { Id, Column } from "../types";
// import { useSortable } from "@dnd-kit/sortable/dist/hooks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS }from "@dnd-kit/utilities";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void
}


export default function ColumnContainer(props: Props) {
    const { column, deleteColumn } = props;
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
    });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

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
                {column.title}
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
            <div>
                Content
            </div>
        </div>
    );
}