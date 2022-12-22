import type {NextPage} from 'next';
import {PageLayout} from '@components/PageLayout';
import {useRouter} from 'next/router';

export default function PostPage() {
    const router = useRouter();
    const id = router.query.event as string;

    console.log(id);
    return (
        <>
            <h1>Post: {id}</h1>
        </>
    );
}
