import LinkIcon from "../icons/link";


export default function Navbar() {

    return (
        <>
            <div className="
            px-4
            mx-auto
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[84%]
            h-[100px]
            min-h-[100px]
            flex
            items-center
            justify-between   
            ">
            <span className="
            text-3xl
            font-bold
            ">
            Kanban.
            </span>

            <a href="https://github.com/Wiran-Larbi/kanban-dnd" className="
            stroke-gray-400
            hover:stroke-white
            transtion-color
            ease-in-out
            duration-300
            ">
                <LinkIcon />
            </a>
            </div>
        </>
    );
}