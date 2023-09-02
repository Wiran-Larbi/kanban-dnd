import { Id } from "../types";

type ColumnInputProps = {
    id: Id;
    title: string;
    onEdit: (val: boolean) => void;
    updateColumn: (id: Id, title: string) => void;
}

export default function ColumnInput(props: ColumnInputProps) {
    const { id, title, onEdit, updateColumn } = props;

    return (
        <input
        className="
        px-2
        bg-black
        focus:border-rose-500
        border
        rounded
        outline-none
        "
        value={title}
        onChange={event => updateColumn(id, event.target.value.length > 32 ? event.target.value.slice(0, 32) : event.target.value)}
        autoFocus 
        onBlur={() => onEdit(false)}
        onKeyDown={(event) => {
            if (event.key !== "Enter") return;
            onEdit(false); 
        }}
        />
    );
}