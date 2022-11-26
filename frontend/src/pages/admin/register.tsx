import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {RegisterSpecialist} from '../../components/RegisterSpecialist';

const MOCK_Modalities = ['Futebol', 'Basket', 'Marathon'];
const Home: NextPage = () => {
    return (
        <>
            <RegisterSpecialist modalities={MOCK_Modalities} />
        </>
    );
};

export default Home;
