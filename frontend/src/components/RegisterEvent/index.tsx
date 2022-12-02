import {Sport} from 'pages/registerEvent';
import React, {useEffect, useState} from 'react';
import {SearchBox} from './searchBox';
import {OtherTable} from './otherTable';
import {PrimaryButton} from '@components/Button';

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
    const [leagueSelected, setLeagueSelected] = useState<boolean>(false);

    const [possibleTeams, setPossibleTeams] = useState<[string]>([]);
    const [selectedTeams, setSelectedTeams] = useState<[string]>([]);

    const getLeagues = () => {
        let thing = sportSelected
            ? data.filter((sportInfo: Sport) => sportInfo.name == sport)[0]
            : data[0];
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
            getLeagues();
            getTeams();
            setSportSelected(true);
        }
    }, [sport]);

    const selectTeam = (e) => {
        console.log(e);
    };

    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState<string>('');
    const changeDate = (e) => {
        setDate(e.target.value);
    };
    const [hour, setHour] = useState<string>('');
    const changeHour = (e) => {
        setHour(e.target.value);
    };

    interface IError {
        name: string;
    }
    const [formErrors, setFormErrors] = useState<IError>({});

    // FIXME
    const submitButtonContent = <div>Submeter</div>;

    const submitClicked = () => {
        console.log('Submit');
    };

    const validate = () => {
        let errors = {};
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
                        maybeError={'Erro'}
                    />
                    <SearchBox
                        content={possibleLeagues}
                        title={'Ligas'}
                        currentSearch={league}
                        changeCurrentSearch={setLeague}
                        selected={leagueSelected}
                        changeSelected={setLeagueSelected}
                        maybeError={'Erro'}
                    />
                </div>
                <div className="w-full">
                    <div className="flex flex-row gap-1 star ">
                        <div className="w-2/3">
                            <OtherTable
                                title="Teams"
                                changeFunction={selectTeam}
                                //content={data.map((sport) => sport.name)}
                                content={possibleTeams}
                                //maybeError={formErrors.sport}
                                maybeError={'Erro'}
                            />
                        </div>
                        <div className="w-1/3 flex flex-col px-3">
                            <div className="datepicker w-full relative form-floating mb-3 ">
                                <input
                                    type="date"
                                    className="form-control block w-full  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Select a date"
                                    onChange={changeDate}
                                    id={'Calendar'}
                                    min={today}
                                />
                                <label
                                    htmlFor="floatingInput"
                                    className="text-gray-700"
                                >
                                    {/* FIXME */}
                                    Game Day
                                </label>
                            </div>
                            <div className="w-full">
                                <div className="timepicker relative form-floating mb-3 ">
                                    <input
                                        type="time"
                                        className="form-control block w-full  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Select a date"
                                        onChange={changeHour}
                                    />
                                    <label
                                        htmlFor="floatingInput"
                                        className="text-gray-700"
                                    >
                                        Match Hour
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <PrimaryButton
                        children={submitButtonContent}
                        onClick={submitClicked}
                    />
                </div>
            </div>
        </div>
    );
};
