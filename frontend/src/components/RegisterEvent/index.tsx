import {Sport} from 'pages/registerEvent';
import React, {useEffect, useState} from 'react';
import {SearchBox} from './searchBox';
import {Table} from './table';
import {PrimaryButton} from '@components/Button';

export interface RegisterEventProps {
    sports: Sport[];
}

interface FormValues {}

interface FormErrors {
    sport: string;
    league: string;
    teams: string;
    hour: string;
    date: string;
}

const initialFormErrors: FormErrors = {
    sport: '',
    league: '',
    teams: '',
    hour: '',
    date: '',
};

export const RegisterEvent = ({sports}: RegisterEventProps) => {
    const [sport, setSport] = useState<string>(sports[0].name);
    const [sportSelected, setSportSelected] = useState<boolean>(false);

    const [possibleLeagues, setPossibleLeagues] = useState<string[]>(
        sports[0].leagues
    );
    const [league, setLeague] = useState<string>('');
    const [leagueSelected, setLeagueSelected] = useState<boolean>(false);

    const [possibleTeams, setPossibleTeams] = useState<string[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

    // Handle submit part
    const [errors, setErrors] = useState<FormErrors>(initialFormErrors);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [date, setDate] = useState<string>('');
    const [hour, setHour] = useState<string>('');

    const getLeagues = () => {
        console.log('getLeagues');
        let thing = sportSelected
            ? sports.filter((sportInfo: Sport) => sportInfo.name == sport)[0]
            : [];
        setPossibleLeagues(thing.leagues);
        return thing.leagues;
    };

    const getTeams = () => {
        console.log('getTeams');
        let thing = sportSelected
            ? sports.filter((sportInfo: Sport) => sportInfo.name == sport)[0]
            : sports[0];
        setPossibleTeams(thing.participants);
        return thing.participants;
    };

    const changeTeams = (team: string, value: boolean) => {
        console.log('changeTeams');
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
    }, [sport]);

    const today = new Date().toISOString().split('T')[0];

    const changeDate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log('changeDate');
        setDate(e.target.value);
    };

    const changeHour: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log('changeHour');
        setHour(e.target.value);
    };

    const hasErrors = () => {
        return Object.values(errors).some((err) => err !== '');
    };

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        validate();

        if (hasErrors()) {
            console.log('has errors');
            return;
        }
    };

    // FIXME

    const validate = () => {
        let errors: FormErrors = {...initialFormErrors};

        // FIXME em todos
        if (!sportSelected) {
            errors.sport = 'Obrigatório';
        }
        if (!leagueSelected) {
            errors.league = 'Obrigatório';
        }
        const sportInfo = sports.filter(
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

        setErrors(errors);
    };

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
                        allResults={sports.map((sport: Sport) => sport.name)}
                        title={'Modalidades'}
                        currentSearch={sport}
                        changeCurrentSearch={setSport}
                        selected={sportSelected}
                        changeSelected={setSportSelected}
                        error={errors.sport}
                    />
                    <SearchBox
                        allResults={possibleLeagues}
                        title={'Ligas'}
                        currentSearch={league}
                        changeCurrentSearch={setLeague}
                        selected={leagueSelected}
                        changeSelected={setLeagueSelected}
                        error={errors.league}
                    />
                </div>
                <div className="w-full">
                    <div className="flex flex-row gap-1 star ">
                        <div className="w-2/3">
                            <Table
                                title="Teams"
                                changeValueHandler={changeTeams}
                                content={possibleTeams}
                                error={errors.teams}
                            />
                        </div>
                        <div className="w-1/3 flex flex-col px-3">
                            <div className="  datepicker w-full relative form-floating mb-3 ">
                                <input
                                    type="date"
                                    className="bg-CULTURED border-2 form-control block w-full  py-1.5 text-base font-normal text-gray-700  bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                                    {errors.date && (
                                        <div className="text-red-500 font-semibold">
                                            {errors.date}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="timepicker relative form-floating mb-3 ">
                                    <input
                                        type="time"
                                        className="bg-CULTURED border-2 form-control block w-full  py-1.5 text-base font-normal text-gray-700 bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                                        {errors.hour && (
                                            <div className="text-red-500 font-semibold">
                                                {errors.hour}
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
