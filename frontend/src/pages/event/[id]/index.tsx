import React from 'react';
import {NextPage} from 'next';
import {PageLayout} from '@components/PageLayout';

interface PageProps {
    eventId: string;
}

const EventPage: NextPage<PageProps> = ({eventId}) => {
    return (
        <PageLayout>
            <div>EventId: {eventId}</div>
        </PageLayout>
    );
};

EventPage.getInitialProps = async ({query}) => {
    return {eventId: query.id as string};
};

export default EventPage;
