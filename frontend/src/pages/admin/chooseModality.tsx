import {SportIcon} from '@components/SportIcon';
import type {NextPage} from 'next';

// FIXME
const MOCK_Modalities = ['football', 'basketball', 'Marathon'];

const Home: NextPage = () => {
    const sportSelected = (sport) => {
        console.log('Selected sport');
        console.log(sport);
    };

    return (
        <div className="gap-8 h-screen w-screen justify-center flex items-center bg-CULTURED">
            <div className=" flex flex-col gap-5 items-top pt-10  min-h-screen w-max  ">
                <div className="bg-white h-fit pl-5 pr-96 text-xl inline-block py-2 font-semibold">
                    {/* TODO: Alterar*/}
                    Selecione uma modalidade
                </div>
                {MOCK_Modalities.map((mod) => (
                    <div
                        className="flex flex-row gap-1 bg-white text-gl py-2 rounded cursor-pointer"
                        onClick={() => sportSelected(mod)}
                        key={`${mod}-3`}
                    >
                        <div className="pr-0">
                            {/* TODO: Alterar*/}
                            <SportIcon eventType={mod} />
                        </div>
                        <div className="pl-0">{mod}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
