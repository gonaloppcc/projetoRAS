import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {RegisterSpecialist} from '../../components/RegisterSpecialist';

const MOCK_MODALITIES = ['Futebol', 'Basket', 'Marathon'];
const Home: NextPage = () => {
    return (
        <>
            <div className="bg-blue-400">
                <RegisterSpecialist modalities={MOCK_MODALITIES} />
            </div>
        </>
    );
};

export default Home;
