import {CheckCard} from './checkCard';

export interface OtherTableProps {
    title: string;
    content: [string];
    changeFunction;
    maybeError: string;
}

export const Table = ({
    title,
    content,
    changeFunction,
    maybeError,
}: OtherTableProps) => {
    return (
        <div className="w-full max-w-md">
            <div className="bg-CULTURED border-2 rounded-lg px-3 py-2 mb-4">
                <div className="block text-gray-700 text-lg font-semibold py-2 px-2">
                    {title}
                </div>

                <div className="  flex flex-row flex-wrap  border-solid pt-3 gap-2 h-28 overflow-auto ">
                    {content.map((word: string) => {
                        return (
                            <div
                                className="w-fit p-1"
                                key={`CheckCard - ${word}`}
                            >
                                <CheckCard
                                    word={word}
                                    changeFunction={changeFunction}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="text-red-500 font-semibold">{maybeError}</div>
        </div>
    );
};
