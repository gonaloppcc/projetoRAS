import React from 'react';
import {NextPage} from 'next';
import {PageLayout} from '@components/PageLayout';
import {useEvent} from '@hooks/useEvent';
import {formatDate} from '../../../utils/formatters';
import {SportIcon} from '@components/SportIcon';
import {OddCard} from '@components/OddCard';
import {getOddsFromParticipants} from '../../../utils/helpers';
import {ParticipantOdd} from '@domain/Bet';
import {useBettingSlip} from '@state/useBettingSlip';

interface PageProps {
    eventId: string;
}

const EventPage: NextPage<PageProps> = ({eventId}) => {
    const {isSuccess, isLoading, isError, event, error} = useEvent(eventId);
    const {addBet} = useBettingSlip();

    let odds: ParticipantOdd[] = [];

    if (isSuccess && event) {
        odds = getOddsFromParticipants(event.participants);
    }

    const homeName = event?.participants.home.participant.participantName || '';
    const awayName = event?.participants.away.participant.participantName || '';
    const eventName = `${homeName} - ${awayName}`;

    const addBetHandler = (odd: ParticipantOdd) => {
        return () =>
            addBet({
                eventId: event?.id || '',
                eventName: eventName,
                eventType: event?.sportId || '',
                odd,
            });
    };

    return (
        <PageLayout>
            <div className="flex flex-col justify-start items-center px-4 min-w-min w-full drop-shadow-sm rounded gap-5">
                {isLoading && <span>Loading...</span>}
                {isError && <span>{error?.message}</span>}
                {isSuccess && (
                    <div className="w-full flex flex-col justify-start items-center gap-4">
                        <div className="w-full flex flex-col justify-start items-center bg-WHITE p-4 gap-3">
                            <div className="w-full flex flex-row justify-start items-center gap-2">
                                <SportIcon eventType={event.sportId} />
                                <span className="text-xs ">
                                    {event.competition}
                                </span>
                            </div>
                            <div className="w-full flex flex-col justify-start item-center gap-2">
                                <span className="text-2xl font-bold text-center">
                                    {`${event.participants.home.participant.participantName} - ${event.participants.away.participant.participantName}`}
                                </span>
                                <span className="text-lg text-center">
                                    {formatDate(event.date)}
                                </span>
                            </div>
                        </div>
                        <div className="w-full h-full flex flex-col justify-start items-center gap-2">
                            {!event.completed && (
                                <div className="w-full flex flex-col justify-start items-center">
                                    <span className="w-full bg-LIGHT_GRAY p-4">
                                        Resultado
                                    </span>
                                    <div className="w-full flex flex-col justify-start items-center gap-0.5">
                                        {odds.map((odd) => (
                                            <div
                                                className="w-full flex flex-row justify-between items-center px-4 py-2 bg-WHITE"
                                                key={odd.id}
                                            >
                                                <span>
                                                    {odd.participantName}
                                                </span>
                                                <OddCard
                                                    {...odd}
                                                    placeOddHandler={addBetHandler(
                                                        odd
                                                    )}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {event.completed && (
                                <div className="w-full flex flex-row justify-center bg-WHITE p-4">
                                    {`Partida terminada: ${event.participants.home.score} - ${event.participants.away.score}`}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

EventPage.getInitialProps = async ({query}) => {
    return {eventId: query.id as string};
};

export default EventPage;
