import React, {useState} from 'react';
import {PrimaryButton} from '@components/Button';
import {Participant, Sport} from '@domain/Event';
import {SportIcon} from '@components/SportIcon';
import {Modal} from '@components/Modal';
import {UpdateOdd} from './updateOdd';
import {Accordion} from '@components/Accordion';

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
    const [open, setOpen] = useState(false);
    const [updateOdd, setUpdateOdd] = useState('');

    const gameDay = info.Date.split('T')[0];
    const regex = /\d+:\d+/g;
    const hour = info.Date.split('T')[1].split('.')[0].match(regex);
    const homeTeam = info.Participants.Home.Participant.PartId;
    const awayTeam = info.Participants.Away.Participant.PartId;

    const clickOdd = (content: string) => {
        console.log('Clicou');
        console.log(content);
        setUpdateOdd(content);
        setOpen(true);
    };

    const line = (name: string, value: number) => {
        return (
            <div className="relative flex gap-3 items-center bg-white py-2 px-3">
                <div className="text-lg">{name}</div>
                <div className="flex-grow border-t border-gray-400 px-5"></div>
                <PrimaryButton onClick={() => clickOdd(name)}>
                    {value}
                </PrimaryButton>
            </div>
        );
    };

    return (
        <div className="w-full">
            {open && (
                <Modal isOpen={open} setIsOpen={setOpen}>
                    <UpdateOdd odd={updateOdd} />
                </Modal>
            )}
            <div className="w-full justify-center flex flex-col  bg-CULTURED gap-3">
                <div className="bg-white  flex flex-col items-center px-10 py-5 h-auto relative gap-2 rounded">
                    <div className="content-start   w-full flex flex-row gap-2 h-10 pl-2  ">
                        <SportIcon eventType={info.Competition.Sport.name} />
                        <div className="text-sm">{`${info.Competition.Sport.name} - ${info.CompetitionId}`}</div>
                    </div>
                    <div className="text-xl font-semibold">{`${homeTeam} - ${awayTeam}`}</div>
                    <div>{`${gameDay} - ${hour}`}</div>
                </div>
                <div className="flex flex-col w-full">
                    <div className="bg-gray-400 w-full pl-2 py-5 font-bold rounded-t-lg">
                        Resultado Final
                    </div>

                    {line(homeTeam, info.Participants.Home.Participant.Price)}
                    {line('Tie', info.Participants.Tie.Price)}
                    {line(awayTeam, info.Participants.Home.Participant.Price)}
                </div>
                <Accordion header={'Resultado final'}>
                    <div className="w-full flex flex-col justify-start gap-1">
                        {line(
                            homeTeam,
                            info.Participants.Home.Participant.Price
                        )}
                        {line('Tie', info.Participants.Tie.Price)}
                        {line(
                            awayTeam,
                            info.Participants.Home.Participant.Price
                        )}
                    </div>
                </Accordion>
            </div>
        </div>
    );
};
