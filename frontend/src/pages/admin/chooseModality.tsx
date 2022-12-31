import {SportIcon} from '@components/SportIcon';
import type {NextPage} from 'next';
import {useSports} from '@hooks/useSports';
import {CircularProgress} from '@mui/material';
import {InfoSport} from '@domain/Event';
import {useRouter} from 'next/router';

const Home: NextPage = () => {
    const {isSuccess, isLoading, isError, sports, error} = useSports();
    const router = useRouter();
    const sportSelected = async (sport: InfoSport) => {
        console.log(`Clicou ${sport.name}`);
        await router.push(`/admin/sports/${sport.name}`);
    };

    return (
        <>
            {isLoading && <CircularProgress />}
            {isSuccess && (
                <div className="gap-8 h-screen w-screen justify-center flex items-center bg-CULTURED">
                    <div className=" flex flex-col gap-5 items-top pt-10  min-h-screen w-max  ">
                        <div className="bg-white h-fit pl-5 pr-96 text-xl inline-block py-2 font-semibold">
                            {/* TODO: Alterar*/}
                            Selecione uma modalidade
                        </div>
                        {sports.map((mod: InfoSport) => {
                            console.log(mod.name);
                            return (
                                <div
                                    className="flex flex-row gap-1 bg-white text-gl py-2 rounded cursor-pointer"
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

            {isError && <span>{error}</span>}
        </>
    );
};

export default Home;
