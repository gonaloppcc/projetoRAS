import type {NextPage} from 'next';
import {RegisterSpecialist} from '../../components/RegisterSpecialist';
import {CircularProgress} from '@mui/material';
import {useSports} from '@hooks/useSports';
//const MOCK_MODALITIES = ['Futebol', 'Basket', 'Marathon'];

const Home: NextPage = () => {
    const {isSuccess, isLoading, isError, sports, error} = useSports();
    return (
        <>
            {isLoading && <CircularProgress />}
            {isSuccess && (
                <div className="bg-blue-400">
                    <RegisterSpecialist modalities={sports} />
                </div>
            )}
            {isError && <span>{error.message}</span>}
        </>
    );
};

export default Home;
