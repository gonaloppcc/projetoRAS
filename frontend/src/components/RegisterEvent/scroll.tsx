export interface ScrollProps {
    title: string;
    content: string[];
    error: string;
    changeFunction: React.ChangeEventHandler<HTMLInputElement>;
}

export const Scroll = ({
    title,
    content,
    error,
    changeFunction,
}: ScrollProps) => {
    return (
        <div>
            <div className="text-lg  border-grey-300 border-b-2 text-slate-400">
                {title}
            </div>

            <div className="border-solid pt-3  h-28 overflow-auto scrollbar-hide">
                {content.map((word) => (
                    <div
                        key={`${word}-3`}
                        className="bg-white flex flex-row items-center justify-between flex-none order-none h-10 py-2 px-5 gap-2"
                    >
                        <div className="flex flex-row gap-1">
                            <div key={`${word}-2`} className="pl-0">
                                {word}
                            </div>
                        </div>
                        <input
                            id={word}
                            key={word}
                            type="checkbox"
                            onChange={changeFunction}
                        />
                    </div>
                ))}
            </div>
            <div className="text-base mt-1 text-red-500 text-right">
                {error}
            </div>
        </div>
    );
};
