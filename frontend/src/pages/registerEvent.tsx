import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {RegisterEvent} from '@components/RegisterEvent';

/* FIXME Mock data hardcoded */
const MOCK_SPORTS: [Sport] = [
    {
        name: 'Football',
        leagues: [
            'Premier league',
            'Primeira liga',
            'Espanha',
            'França',
            'Espanha2',
            'Polónia',
        ],
        participants: ['Benfica', 'Porto', 'Real Madrid', 'Varzim', 'Rio Ave'],
        maxParticipants: 2,
        minParticipants: 2,
    },
    {
        name: 'Basket',
        leagues: ['NBA', 'Primeira liga'],
        participants: ['LA Lakers', 'Golden Gate Warriors', 'Celtic'],
        maxParticipants: 2,
        minParticipants: 2,
    },
    {
        name: 'Karaté',
        leagues: ['Não sei', 'Jackie Chan'],
        participants: ['Gonçalo', 'Tomás', 'O Cardoso'],
        maxParticipants: 2,
        minParticipants: 2,
    },
];

export interface Sport {
    name: string;
    leagues: [string];
    participants: [string];
    maxParticipants: number;
    minParticipants: number;
}

const Home: NextPage = () => {
    /* FIXME DUMMY MAIN PAGE!! */
    return (
        <div className="flex flex-col justify-start gap-3 w-full">
            <RegisterEvent data={MOCK_SPORTS} />
        </div>
    );
};

export default Home;