import {Sport} from 'pages/registerEvent';
import React, {useEffect, useState} from 'react';
import {SearchBox} from './searchBox';
import {OtherTable} from './table';
import {PrimaryButton} from '@components/Button';

export interface RegisterEventProps {
    data: React.ReactNode;
}

export const RegisterEvent = ({data}: [Sport]) => {
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
    };

    const getTeams = () => {
        let thing = sportSelected
            ? data.filter((sportInfo: Sport) => sportInfo.name == sport)[0]
            : data[0];
        setPossibleTeams(thing.participants);
        return thing.participants;
    };

    const changeTeams = (team: string, value: boolean) => {
        value
            ? setSelectedTeams((current) => [...current, team])
            : setSelectedTeams((current) =>
                  current.filter((element: string) => {
                      return element !== team;
                  })
              );
    };

    // Necessary to update the leagues and teams associated to the sport
    useEffect(() => {
        if (sportSelected) {
            getLeagues();
            setSelectedTeams([]);
            getTeams();
            setSportSelected(true);
        }
    }, [getLeagues, getTeams, sport, sportSelected]);

    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState<string>('');
    const changeDate = (e) => {
        setDate(e.target.value);
    };
    const [hour, setHour] = useState<string>('');
    const changeHour = (e) => {
        setHour(e.target.value);
    };

    // Handle submit part
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    //form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate());
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit();
        }
    }, [formErrors, isSubmitting, submit]);

    // FIXME

    const submit = () => {
        console.log('Submit');
        console.log(date);
        console.log(hour);
        console.log(sport);
        console.log(league);
        console.log(selectedTeams);
    };

    const validate = () => {
        let errors = {};
        // FIXME em todos
        if (!sportSelected) {
            errors.sport = 'Obrigatório';
        }
        if (!leagueSelected) {
            errors.league = 'Obrigatório';
        }
        const sportInfo = data.filter(
            (sportInList) => sportInList.name === sport
        )[0];

        if (leagueSelected && !sportInfo.leagues.includes(league)) {
            errors.league = 'Liga não disponível na modalidade';
        }

        if (sportSelected) {
            const numSelectedTeams = selectedTeams.length;
            if (numSelectedTeams > sportInfo.maxParticipants) {
                errors.teams = 'Número de equipas ultrapassa máximo.';
            }
            if (numSelectedTeams < sportInfo.minParticipants) {
                errors.teams = 'Número de equipas insuficiente.';
            }
        }
        if (!date) {
            errors.date = 'Obrigatório';
        }
        if (!hour) {
            errors.hour = 'Obrigatório';
        }

        return errors;
    };

    const submitButtonContent = <div></div>;

    return (
        <div className="h-screen w-screen justify-center flex items-center bg-CULTURED">
            <div className="bg-white  flex flex-col items-center px-10 py-10 h-auto  relative gap-2">
                <div className="w-fit h-10  text-4xl ">
                    {/* FIXME */}
                    Adicionar evento
                </div>
                <div className="flex flex-row gap-5 space-evenly">
                    {/* FIXME  Títulos das searchBoxes*/}
                    <SearchBox
                        allResults={data.map((sport: Sport) => sport.name)}
                        title={'Modalidades'}
                        currentSearch={sport}
                        changeCurrentSearch={setSport}
                        selected={sportSelected}
                        changeSelected={setSportSelected}
                        error={formErrors.sport}
                    />
                    <SearchBox
                        allResults={possibleLeagues}
                        title={'Ligas'}
                        currentSearch={league}
                        changeCurrentSearch={setLeague}
                        selected={leagueSelected}
                        changeSelected={setLeagueSelected}
                        error={formErrors.league}
                    />
                </div>
                <div className="w-full">
                    <div className="flex flex-row gap-1 star ">
                        <div className="w-2/3">
                            <OtherTable
                                title="Teams"
                                changeFunction={changeTeams}
                                //content={data.map((sport) => sport.name)}
                                content={possibleTeams}
                                //maybeError={formErrors.sport}
                                maybeError={formErrors.teams}
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
                                <div className="flex flex-row justify-between">
                                    <label
                                        htmlFor="floatingInput"
                                        className="text-gray-700"
                                    >
                                        {/* FIXME */}
                                        Game Day
                                    </label>
                                    {formErrors.date && (
                                        <div className="text-red-500 font-semibold">
                                            Erro
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="timepicker relative form-floating mb-3 ">
                                    <input
                                        type="time"
                                        className="form-control block w-full  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Select a date"
                                        onChange={changeHour}
                                    />
                                    <div className="flex flex-row justify-between">
                                        <label
                                            htmlFor="floatingInput"
                                            className="text-gray-700"
                                        >
                                            Match Hour
                                        </label>
                                        {formErrors.hour && (
                                            <div className="text-red-500 font-semibold">
                                                Erro
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <PrimaryButton onClick={handleSubmit}>
                        Submeter
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};
