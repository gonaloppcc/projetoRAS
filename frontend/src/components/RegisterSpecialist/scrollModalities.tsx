export const ScrollModalities = (props) => {
    const checkBoxClicked = (args, mod) => {
        //console.log(args);
        //console.log(mod.target.checked);
        props.changeModality(args, mod.target.checked);
    };

    return (
        <div>
            <div className="text-lg border-grey-300 border-b-2 text-slate-400">
                Modalidades
            </div>

            <div className="border-solid pt-3  h-24 overflow-auto scrollbar-hide">
                {props.modalities.map((mod) => (
                    <>
                        <div
                            key={`${mod}-3`}
                            className="bg-white flex flex-row items-center justify-between flex-none order-none h-10 py-2 px-5 gap-2"
                        >
                            <div className="flex flex-row gap-1">
                                <div key={`${mod}-1`} className="pr-0">
                                    ☺︎
                                </div>
                                <div key={`${mod}-2`} className="pl-0">
                                    {mod}
                                </div>
                            </div>
                            <input
                                id={mod}
                                key={mod}
                                target={mod}
                                type="checkbox"
                                onChange={checkBoxClicked.bind(this, mod)}
                            />
                        </div>
                    </>
                ))}
            </div>
            <div className="text-base mt-1 text-red-500 text-right">
                {props.maybeError}
            </div>
        </div>
    );
};
