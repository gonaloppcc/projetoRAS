import {Sport} from 'pages/registerEvent';
import React, {useEffect, useState} from 'react';
import {SearchBox} from './searchBox';
import {OtherTable} from './otherTable';

export interface RegisterEventProps {
    data: React.ReactNode;
}

export const RegisterEvent = ({data}: [Sport]) => {
    /*
    Get Sports available
    */

    const [sport, setSport] = useState<string>('');
    const [sportSelected, setSportSelected] = useState<boolean>(false);

    const [possibleLeagues, setPossibleLeagues] = useState<[string]>(
        data[0].leagues
    );
    const [league, setLeague] = useState<string>('');
    const [leagueSelected, setLeagueSelected2] = useState<boolean>(false);

    const [possibleTeams, setPossibleTeams] = useState<[string]>([]);
    const [selectedTeams, setSelectedTeams] = useState<[string]>([]);

    const setLeagueSelected = (value: boolean) => {
        console.log('Change select league');
        console.log(value);
        setLeagueSelected2(value);
    };

    const getLeagues = () => {
        let thing = sportSelected
            ? data.filter((sportInfo: Sport) => sportInfo.name == sport)[0]
            : data[0];
        console.log(thing.leagues);
        console.log(data[0].leagues);
        setPossibleLeagues(thing.leagues);
        return thing.leagues;
        //return thing[0].leagues;
        return ['Olá', 'Adeus'];
    };

    const getTeams = () => {
        let thing = sportSelected
            ? data.filter((sportInfo: Sport) => sportInfo.name == sport)[0]
            : data[0];
        setPossibleTeams(thing.participants);
        return thing.participants;
        //return thing[0].leagues;
        return ['Olá', 'Adeus'];
    };
    // Necessary to update the leagues associated to the sport
    useEffect(() => {
        if (sportSelected) {
            console.log('Atualiza equipas e ligas');
            getLeagues();
            getTeams();
            setSportSelected(true);
        } else {
            setPossibleLeagues([]);
            setPossibleTeams([]);
        }
    }, [sport]);

    const selectTeam = (e) => {
        console.log(e);
    };

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
                    <SearchBox
                        content={possibleLeagues}
                        title={'Ligas'}
                        currentSearch={league}
                        changeCurrentSearch={setLeague}
                        selected={leagueSelected}
                        changeSelected={setLeagueSelected}
                    />
                </div>
                <div>
                    <OtherTable
                        title="Teams"
                        changeFunction={selectTeam}
                        //content={data.map((sport) => sport.name)}
                        content={possibleTeams}
                        //maybeError={formErrors.sport}
                        maybeError={''}
                    />
                </div>
            </div>
        </div>
    );
};
