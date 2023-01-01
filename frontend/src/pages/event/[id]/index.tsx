import React from 'react';
import {NextPage} from 'next';
import {PageLayout} from '@components/PageLayout';
import {useEvent} from '@hooks/useEvent';

interface PageProps {
    eventId: string;
}

const EventPage: NextPage<PageProps> = ({eventId}) => {
    const {isSuccess, isLoading, isError, event, error} = useEvent(eventId);

    return (
        <PageLayout>
            <div className="flex flex-col justify-start items-center px-4 min-w-min w-full h-full drop-shadow-sm rounded bg-WHITE gap-5 p-4">
                {isLoading && <span>Loading...</span>}
                {isSuccess && (
                    <span>
                        {event.participants.home.participant.participantName}
                        {' - '}
                        {event.participants.away.participant.participantName}
                    </span>
                )}
            </div>
        </PageLayout>
    );
};

EventPage.getInitialProps = async ({query}) => {
    return {eventId: query.id as string};
};

export default EventPage;
