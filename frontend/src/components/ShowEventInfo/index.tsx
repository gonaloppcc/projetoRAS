import React, {useEffect, useState} from 'react';
import {PrimaryButton} from '@components/Button';
import {useRouter} from 'next/router';
import {Sport, Participant} from '@domain/Event';
import {postEvent} from 'services/backend/event';
import {SportIcon} from '@components/SportIcon';

export interface Part {
    Players: Participant[];
    Name: string;
}

export interface ParticipantContent {
    Part: Part;
    PartId: string;
    Id: string;
    Price: number;
    Promo?: number;
}

export interface Team {
    Participant: ParticipantContent;

    Id: string;
    ParticipantId: string;
    Score: number;
}
export interface TieOdd {
    Id: string;
    Price: number;
    Promo?: number;
}

export interface Participants {
    Home: Team;
    Away: Team;
    Tie: TieOdd;
    HomeId: string;
    AwayId: string;
    TieId: string;
    Id: string;
}

export interface ShowEventInfoProps {
    info: GetEvent;
}

export interface GetEvent {
    //sports: ;

    Participants: Participants;
    Competition: Competition;
    Id: string;
    ParticipantsId: string;
    Date: string;
    CompetitionId: string;
    Completed: boolean;
}

export interface Competition {
    Sport: Sport;
    Name: string;
    SportId: string;
}

export const ShowEventInfo = ({info}: ShowEventInfoProps) => {
    //const [sportName, setSportName] = useState<string>(sports[0].name);
    console.log('O que recebe2?');
    console.log(info);
    const gameDay = info.Date.split('T')[0];
    const regex = /\d+:\d+/g;
    const hour = info.Date.split('T')[1].split('.')[0].match(regex);
    const homeTeam = info.Participants.Home.Participant.PartId;
    const awayTeam = info.Participants.Away.Participant.PartId;

    const clickOdd = () => {
        console.log('Clicou');
    };

    return (
        <div className="h-screen w-screen justify-center flex flex-col items-center  bg-CULTURED gap-3">
            <div className="bg-white  flex flex-col items-center px-10 py-10 h-auto w-1/2 relative gap-2 rounded">
                <div className="flex flex-row gap-2 w-fit h-10 pl-2  ">
                    <SportIcon eventType={info.Competition.Sport.Name} />
                    <div className="text-sm">{`${info.Competition.Sport.Name} - ${info.CompetitionId}`}</div>
                </div>
                <div className="text-xl font-semibold">{`${homeTeam} - ${awayTeam}`}</div>
                <div>{`${gameDay} - ${hour}`}</div>
            </div>
            <div className="flex flex-col w-1/2">
                <div className="bg-gray-400 w-full pl-2 py-5 rounded-t-lg">
                    Resultado Final
                </div>
                <div className="relative flex py-5 items-center bg-white">
                    <div>{homeTeam}</div>
                    <div className="flex-grow border-t border-gray-400 px-5"></div>
                    <PrimaryButton onClick={clickOdd}>
                        {info.Participants.Home.Participant.Price}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};
