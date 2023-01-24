import {SportIcon} from '@components/SportIcon';
import type {NextPage} from 'next';
import {useSports} from '@hooks/useSports';
import {CircularProgress} from '@mui/material';
import {Sport} from '@domain/Event';
import {useRouter} from 'next/router';
import {PageLayout} from '@components/PageLayout';

const Home: NextPage = () => {
    const {isSuccess, isLoading, isError, sports, error} = useSports();
    const router = useRouter();
    const sportSelected = async (sport: Sport) => {
        await router.push(`/admin/sports/${sport.name}`);
    };

    return (
        <PageLayout>
            {isLoading && <CircularProgress />}
            {isSuccess && (
                <div className="gap-8 h-full w-full justify-start flex flex-col items-center bg-CULTURED">
                    <div className="flex flex-col gap-5 items-top">
                        <div className="bg-white h-fit pl-5 pr-96 text-xl inline-block py-4 font-semibold">
                            {/* TODO: Alterar*/}
                            Selecione uma modalidade
                        </div>
                        {sports.map((mod: Sport) => {
                            return (
                                <div
                                    className="flex flex-row gap-2 bg-white text-gl p-3 rounded cursor-pointer"
                                    onClick={() => sportSelected(mod)}
                                    key={`${mod.name}-3`}
                                >
                                    <div className="pr-0">
                                        {/* TODO: Alterar*/}
                                        <SportIcon eventType={mod.name} />
                                    </div>
                                    <div className="pl-0">{mod.name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {isError && <span>{error.message}</span>}
        </PageLayout>
    );
};

export default Home;
