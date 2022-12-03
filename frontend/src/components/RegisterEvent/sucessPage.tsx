import {PrimaryButton} from '@components/Button';

export interface SucessPageProps {
    changePage: (value: boolean) => void;
}

export const SucessPage = ({changePage}: SucessPageProps) => {
    const addNewEvent = <div>Adicionar novo evento?</div>;

    return (
        <div className="h-screen w-screen justify-center flex items-center bg-CULTURED">
            <div className="bg-white  flex flex-col items-center px-10 py-10 h-auto  relative gap-2">
                <div className="w-fit h-10  text-4xl ">
                    Evento submetido com sucesso
                </div>
                <PrimaryButton
                    children={addNewEvent}
                    onClick={() => changePage(false)}
                />
            </div>
        </div>
    );
};
