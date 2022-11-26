import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {DeleteAccount} from '../../components/DeleteAccount';

const Home: NextPage = () => {
    return (
        <>
            <DeleteAccount />
        </>
    );
};

export default Home;
