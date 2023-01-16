import React from 'react';
import {NextPage} from 'next';
import {PageLayout} from '@components/PageLayout';
import {useEvent} from '@hooks/useEvent';
import {formatDate} from '../../../utils/formatters';
import {SportIcon} from '@components/SportIcon';

interface PageProps {
    eventId: string;
}

const EventPage: NextPage<PageProps> = ({eventId}) => {
    const {isSuccess, isLoading, isError, event, error} = useEvent(eventId);

    return (
        <PageLayout>
            <div className="flex flex-col justify-start items-center px-4 min-w-min w-full drop-shadow-sm rounded gap-5">
                {isLoading && <span>Loading...</span>}
                {isError && <span>{error?.message}</span>}
                {isSuccess && (
                    <div className="w-full flex flex-col justify-start items-center bg-white p-4 gap-3">
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
                )}
            </div>
        </PageLayout>
    );
};

EventPage.getInitialProps = async ({query}) => {
    return {eventId: query.id as string};
};

export default EventPage;
