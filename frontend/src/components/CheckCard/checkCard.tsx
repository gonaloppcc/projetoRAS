export interface CheckCardPros {
    word: string;
    changeFunction: (string: string, checked: boolean) => void;
}

export const CheckCard = ({word, changeFunction}: CheckCardPros) => {
    const checkBoxClicked: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        changeFunction(word, e.target.checked);
    };

    return (
        <div
            key={`${word}-3`}
            className="w-fit bg-gray-300 flex flex-row items-center flex-wrap justify-between order-none h-10 py-2 px-5 gap-2"
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
                onChange={checkBoxClicked}
            />
        </div>
    );
};
