import {CheckCard} from '../CheckCard/checkCard';

export interface TableProps {
    title: string;
    results: string[];
    setValue: (name: string, checked: boolean) => void;
    error?: string;
}

export const Table = ({title, results, setValue, error}: TableProps) => {
    return (
        <div className="w-full max-w-md">
            <div className="bg-CULTURED border-2 rounded-lg px-3 py-2 mb-4">
                <div className="block text-gray-700 text-lg font-semibold py-2 px-2">
                    {title}
                </div>

                <div className="  flex flex-row flex-wrap  border-solid pt-3 gap-2 h-28 overflow-auto ">
                    {results.map((word: string) => {
                        return (
                            <div
                                className="w-fit p-1"
                                key={`CheckCard - ${word}`}
                            >
                                <CheckCard
                                    word={word}
                                    changeFunction={setValue}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="text-red-500 font-semibold">{error}</div>
        </div>
    );
};
