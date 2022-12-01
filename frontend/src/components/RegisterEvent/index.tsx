import {Sport} from 'pages/registerEvent';
import React, {useEffect, useState} from 'react';
import {SearchBox} from './searchBox';

export interface RegisterEventProps {
    data: React.ReactNode;
}

export const RegisterEvent = ({data}: [Sport]) => {
    /*
    Get Sports available
    */

    const [sport, setSport] = useState<string>('');
    const [sportSelected, setSportSelected] = useState<boolean>(false);

    const [possibleLeagues, setPossibleLeagues] = useState<[string]>([]);
    const [league, setLeague] = useState<string>('');
    const [leagueSelected, setLeagueSelected] = useState<boolean>(false);

    const getLeagues = () => {
        let thing = sportSelected
            ? data.filter((sportInfo: Sport) => sportInfo.name == sport)[0]
            : data[0];
        console.log(thing);
        console.log(thing.leagues);
        setPossibleLeagues(thing.leagues);
        return thing.leagues;
        //return thing[0].leagues;
        return ['Olá', 'Adeus'];
    };

    // Necessary to update the leagues associated to the sport
    useEffect(() => {
        if (sportSelected) {
            getLeagues();
        }
    }, [sportSelected]);

    return (
        <div className="h-screen w-screen justify-center flex items-center bg-CULTURED">
            <div className="bg-white  flex flex-col items-center px-10 py-10 h-auto  relative gap-3">
                <div className="w-fit h-10  text-4xl ">
                    {/* FIXME */}
                    Adicionar evento
                </div>
                <div className="flex flex-row gap-5 space-evenly">
                    {/* FIXME  Títulos das searchBoxes*/}
                    <SearchBox
                        content={data.map((sport: Sport) => sport.name)}
                        title={'Modalidades'}
                        currentSearch={sport}
                        changeCurrentSearch={setSport}
                        selected={sportSelected}
                        changeSelected={setSportSelected}
                    />
                    {sportSelected && (
                        <SearchBox
                            content={possibleLeagues}
                            title={'Ligas'}
                            currentSearch={league}
                            changeCurrentSearch={setLeague}
                            selected={leagueSelected}
                            changeSelected={setLeagueSelected}
                        />
                    )}
                    {!sportSelected && <div>Espera </div>}
                </div>
            </div>
        </div>
    );
};
