import React from 'react';
import {PrimaryButton} from '@components/Button';
import {useRouter} from 'next/router';

const Success = () => {
    const router = useRouter();

    const changePageHandler = async () => {
        await router.push('/registerEvent');
    };

    return (
        <div className="h-screen w-screen justify-center flex items-center bg-CULTURED">
            <div className="bg-white flex flex-col items-center px-10 py-10 h-auto relative gap-5 ">
                <div className="w-fit text-4xl">
                    Evento submetido com sucesso
                </div>
                <PrimaryButton onClick={changePageHandler}>
                    Adicionar novo evento?
                </PrimaryButton>
            </div>
        </div>
    );
};

export default Success;