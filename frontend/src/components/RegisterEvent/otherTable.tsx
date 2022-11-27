export const OtherTable = (props) => {
    const checkBoxClicked = (args, mod) => {
        props.changeFunction(args, mod.target.checked);
    };
    const CardOption = (prop) => {
        return (
            <>
                <div
                    key={`${prop.word}-3`}
                    className="w-fit bg-red-500 flex flex-row items-center flex-wrap justify-between flex-none order-none h-10 py-2 px-5 gap-2"
                >
                    <div className="flex flex-row gap-1">
                        <div key={`${prop.word}-2`} className="pl-0">
                            {prop.word}
                        </div>
                    </div>
                    <input
                        id={prop.word}
                        key={prop.word}
                        target={prop.word}
                        type="checkbox"
                        onChange={checkBoxClicked.bind(this, prop.word)}
                    />
                </div>
            </>
        );
    };
    return (
        <div>
            <div className="text-lg border-grey-300 border-b-2 text-slate-400">
                {props.title}
            </div>

            <div className=" bg-blue-400 flex flex-row flex-wrap w-96 border-solid pt-3 gap-2 h-24 ">
                {props.content.map((word) => {
                    return (
                        <>
                            <div className="w-fit">
                                <CardOption word={word} />
                            </div>
                        </>
                    );
                })}
            </div>
            <div className="text-base mt-1 text-red-500 text-right">
                {props.maybeError}
            </div>
        </div>
    );
};
