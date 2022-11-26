import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {ScrollModalities} from '../../components/RegisterSpecialist/scrollModalities';

const MOCK_Modalities = ['Futebol', 'Basket', 'Marathon'];
const Home: NextPage = () => {
    return (
        <>
            <div className="gap-8 h-screen w-screen bg-CULTURED">
                <div className="relative pl-1/2 h-64 w-64">
                    <div className="bg-white absolute inset-x-0 top-0 h-16">
                        Selecione uma modalidade Nao consigo
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
