export const Scroll = (props) => {
    const checkBoxClicked = (args, mod) => {
        props.changeFunction(args, mod.target.checked);
    };

    return (
        <div>
            <div className="text-lg border-grey-300 border-b-2 text-slate-400">
                {props.title}
            </div>

            <div className="border-solid pt-3  h-24 overflow-auto scrollbar-hide">
                {props.content.map((word) => (
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
                            target={word}
                            type="checkbox"
                            onChange={checkBoxClicked.bind(this, word)}
                        />
                    </div>
                ))}
            </div>
            <div className="text-base mt-1 text-red-500 text-right">
                {props.maybeError}
            </div>
        </div>
    );
};
