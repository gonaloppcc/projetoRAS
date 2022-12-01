export interface RedButtonProps {
    text: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Não meti primary button porque preciso do onClick
 * Mas meti tipos :)
 */

export const RedButton = ({text, onClick}: RedButtonProps) => {
    return (
        <div
            onClick={onClick}
            className="  text-white	h-12 p-2 w-30  bg-red-600 text-center	 rounded"
        >
            <button>{text}</button>
        </div>
    );
};
