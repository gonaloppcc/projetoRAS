import {PrimaryButton} from '@components/Button';

export interface SucessPageProps {
    changePage: (value: boolean) => void;
}

export const SucessPage = ({changePage}: SucessPageProps) => {
    return (
        <div className="h-screen w-screen justify-center flex items-center bg-CULTURED">
            <div className="bg-white flex flex-col items-center px-10 py-10 h-auto relative gap-5 ">
                <div className="w-fit text-4xl">
                    Evento submetido com sucesso
                </div>
                <PrimaryButton onClick={() => changePage(false)}>
                    Adicionar novo evento?
                </PrimaryButton>
            </div>
        </div>
    );
};
