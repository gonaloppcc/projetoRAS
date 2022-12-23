import type {NextPage} from 'next';
import {PageLayout} from '@components/PageLayout';
import {useRouter} from 'next/router';
import {useEvent} from '@hooks/useEvent';
import {CircularProgress} from '@mui/material';
import {ShowEventInfo} from '@components/ShowEventInfo';

export default function PostPage() {
    const router = useRouter();
    const id = router.query.event as string;

    const {isSuccess, isLoading, isError, event, error} = useEvent(id);
    console.log('O que recebe?');
    console.log(JSON.stringify(event));

    return (
        <>
            {isLoading && <CircularProgress />}

            {isSuccess && <ShowEventInfo info={event} />}
            {isError && <span>{error}</span>}
        </>
    );
}
