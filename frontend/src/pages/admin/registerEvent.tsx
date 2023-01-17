import type {NextPage} from 'next';
import {CircularProgress} from '@mui/material';
import {RegisterEvent} from '@components/RegisterEvent';
import {useSports} from '@hooks/useSports';

const Home: NextPage = () => {
    const {isSuccess, isLoading, isError, sports} = useSports();
    return (
        <>
            {isLoading && <CircularProgress />}
            {isSuccess && (
                <div className="flex flex-col justify-start gap-3 w-full">
                    <RegisterEvent sports={sports} />
                </div>
            )}

            {isError && (
                <span>
                    Ocorreu um erro, por favor tente novamente mais tarde
                </span>
            )}
        </>
    );
};

export default Home;