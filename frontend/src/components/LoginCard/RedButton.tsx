export interface RedButtonProps {
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

/**
 * Não meti primary button porque preciso do onClick
 * Mas meti tipos :)
 */

export const RedButton = ({text, onClick, type}: RedButtonProps) => {
    if (type)
        return (
            <button
                className="bg-IMPERIAL_RED hover:bg-CARNELIAN py-2 px-4 disabled:opacity-50 disable:cursor-not-allowed text-WHITE rounded font-semibold"
                type={type}
            >
                {text}
            </button>
        );
    else {
        return (
            <button
                onClick={onClick}
                className="bg-IMPERIAL_RED hover:bg-CARNELIAN py-2 px-4 disabled:opacity-50 disable:cursor-not-allowed text-WHITE rounded font-semibold"
            >
                {text}
            </button>
        );
    }
};
