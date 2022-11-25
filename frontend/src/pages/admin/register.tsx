import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {LoginCard} from '../../components/LoginCard';

const Home: NextPage = () => {
    return (
        <>
            <div className="bg-blue-500">Olá !</div>
            <LoginCard />
        </>
    );
};

export default Home;
