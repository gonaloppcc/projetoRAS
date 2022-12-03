import type {NextPage} from 'next';
import Head from 'next/head';
import {LoginCard} from '../../components/LoginCard';
import Image from 'next/image';
import {PageLayout} from '@components/PageLayout';
import {Navbar} from '@components/Navbar';

const Home: NextPage = () => {
    return (
        <div>
            {/*Depois remover, o log in não tem navbar assim :)*/}
            <Navbar />

            <LoginCard />
        </div>
    );
};

export default Home;
