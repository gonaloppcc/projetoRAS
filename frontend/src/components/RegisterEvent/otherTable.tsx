import {CheckCard} from './checkCard';

export interface OtherTableProps {
    title: string;
    content: [string];
    changeFunction;
    maybeError: string;
}

export const OtherTable = ({
    title,
    content,
    changeFunction,
    maybeError,
}: OtherTableProps) => {
    return (
        <div>
            <div className="text-lg border-grey-300 border-b-2 text-slate-400">
                {title}
            </div>

            <div className=" bg-gray-400 flex flex-row flex-wrap w-96 border-solid pt-3 gap-2 h-24 overflow-auto">
                {content.map((word: string) => {
                    return (
                        <div className="w-fit p-1" key={`CheckCard - ${word}`}>
                            <CheckCard
                                word={word}
                                changeFunction={changeFunction}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="text-base mt-1 text-red-500 text-right">
                {maybeError}
            </div>
        </div>
    );
};
