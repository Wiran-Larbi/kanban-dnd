import TrashIcon from "../icons/trash";
import { Id, Column } from "../types";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void
}


export default function ColumnContainer(props: Props) {
    const { column, deleteColumn } = props;

    return (
        <div className="
        flex
        flex-col
        w-[350px]
        h-[500px]
        max-h-[500px]
        bg-columnBackgroundColor
        rounded-md
        ">
            {/* Column Title */}
        <div className="
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