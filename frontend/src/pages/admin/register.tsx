import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {RegisterSpecialist} from '../../components/RegisterSpecialist';

const Home: NextPage = () => {
    return (
        <>
            <RegisterSpecialist />
        </>
    );
};

export default Home;
