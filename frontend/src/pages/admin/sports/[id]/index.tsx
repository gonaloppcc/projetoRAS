import React from 'react';
import {NextPage} from 'next';
import {CircularProgress} from '@mui/material';
import {useEventsBySport} from '@hooks/useEventsBySport';
import {GameCardAdmin} from '@components/GameCardAdmin';
import {usePagination} from '@hooks/usePagination';
import {PageLayout} from '@components/PageLayout';
import {Navbar} from '@components/Navbar';
import {Pagination} from '@components/Pagination';

interface PageProps {
    sportId: string;
}

const NUM_PAGES = 10;

const EventPage: NextPage<PageProps> = ({sportId}) => {
    const {currentPage, setCurrentPage} = usePagination();
    const {isSuccess, isLoading, isError, events} = useEventsBySport({
        sportId: sportId,
        pageNum: currentPage,
    });

    return (
        <>
            <Navbar />
            {isLoading && <CircularProgress />}
            {isSuccess && (
                <div className="gap-8 bg-CULTURED w-full justify-start flex flex-col items-center">
                    <div className="h-full flex flex-col gap-5 items-top">
                        <div className="text-xl bg-white font-semibold p-4">
                            Jogos
                        </div>
                        {events.map((game) => (
                            <GameCardAdmin
                                key={game.id}
                                game={game}
                                sport={sportId}
                                textButton={'Fechar jogo'}
                                textPropsUp={'Insira resultado'}
                                textSucess={'Jogo fechado com sucesso'}
                                resultOrOdd={true}
                                textSet={'Pontos'}
                            />
                        ))}
                        <Pagination
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            totalPages={NUM_PAGES}
                        />
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        totalPages={NUM_PAGES}
                    />
                </div>
            )}
            {isError && <span>Something went wrong!</span>}
        </>
    );
};

EventPage.getInitialProps = async ({query}) => {
    return {sportId: query.id as string};
};

export default EventPage;
