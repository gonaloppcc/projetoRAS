import React from 'react';
import {NextPage} from 'next';
import {PageLayout} from '@components/PageLayout';

interface PageProps {
    eventId: string;
}

const EventPage: NextPage<PageProps> = ({eventId}) => {
    return <div>Sport: {eventId}</div>;
};

EventPage.getInitialProps = async ({query}) => {
    return {eventId: query.id as string};
};

export default EventPage;
