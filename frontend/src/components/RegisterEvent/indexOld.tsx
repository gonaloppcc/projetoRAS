import React, {useEffect, useState} from 'react';
import {OtherTable} from './otherTable';
import {Scroll} from './scroll';
import {Sport} from 'pages/specialist/registerEvent';

export interface RegisterEventProps {
    data: React.ReactNode;
}

export const RegisterEvent = ({data}: [Sport]) => {
    /*
    Get Sports available
    */
    const [sport, setSport] = useState([]);
    const changeSport = (sport, value) => {
        value
            ? setSport((current) => [...current, sport])
            : setSport((current) =>
                  current.filter((element) => {
                      return element !== sport;
                  })
              );
    };
    const [teams, setTeams] = useState([]);
    const changeTeams = (team, value) => {
        value
            ? setTeams((current) => [...current, team])
            : setTeams((current) =>
                  current.filter((element) => {
                      return element !== team;
                  })
              );
    };
    const [league, setLeague] = useState([]);
    const changeLeague = (league, value) => {
        value
            ? setLeague((current) => [...current, league])
            : setLeague((current) =>
                  current.filter((element) => {
                      return element !== league;
                  })
              );
    };
    const [date, setDate] = useState('');
    const changeDate = (e) => {
        setDate(e.target.value);
    };
    const [hour, setHour] = useState('');
    const changeHour = (e) => {
        setHour(e.target.value);
    };
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {
        console.log('Submissão feita');
        console.log(sport);
        console.log(teams);
        console.log(league);
        console.log('Data do jogo:', date);
        console.log(hour);
    };

    //input change handler
    /*const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };*/

    //form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate());
        setIsSubmitting(true);
    };

    const getCurrentSport = () => {
        return sport.length > 0 ? sport[0] : data[0].name;
    };

    //form validation handler
    const validate = () => {
        let errors = {};
        let sportInfo = data.filter(
            (sport: Sport) => sport.name === getCurrentSport()
        )[0];

        if (teams.length > sportInfo.maxParticipants)
            errors.teams = 'Demasiados participantes';
        if (teams.length < sportInfo.minParticipants)
            errors.teams = 'Faltam participantes.';
        if (sport.length > 1) {
            errors.sport = 'Choose max one.';
        }
        if (league.length !== 1) errors.league = 'Choose max one.';
        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit();
        }
    }, [formErrors]);

    const getTeams = () => {
        let currentSport = getCurrentSport();
        return data
            .map((sport: Sport) => {
                if (sport.name === currentSport) {
                    return sport.participants;
                }
            })
            .filter((elem) => elem !== undefined)[0];
    };
    const getLeagues = () => {
        let currentSport: string = getCurrentSport();
        return data
            .map((sport: Sport) => {
                if (sport.name === currentSport) {
                    return sport.leagues;
                }
            })
            .filter((elem: Sport) => elem !== undefined)[0];
    };
    const today = new Date().toISOString().split('T')[0];

    const showForm: boolean = true;

    return (
        <div className="h-screen w-screen justify-center flex items-center bg-CULTURED">
            <div className="bg-white  flex flex-col items-center px-10 py-10 h-auto  relative gap-3">
                <div className="w-fit h-10  not-italic font-normal text-4xl leading-10 text-black flex-none order-none  flex-grow-0">
                    {/* FIXME */}
                    Adicionar evento
                </div>
                <div className="flex flex-row  center w-full ">
                    <div className="datepicker w-1/2 relative form-floating mb-3 xl:w-96">
                        <input
                            type="date"
                            className="form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                    <div className="flex justify-center w-1/4">
                        <div className="timepicker relative form-floating mb-3 xl:w-96">
                            <input
                                type="time"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                <div className="flex flex-col  items-start flex-none order-1 gap-12 ">
                    <div className="flex-none order-none  ">
                        {/* FIXME Todos */}
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className=" gap-5"
                        >
                            {showForm ? (
                                <Scroll
                                    key="Scroll_Sport"
                                    title="Desporto"
                                    changeFunction={changeSport}
                                    content={data.map((sport) => sport.name)}
                                    maybeError={formErrors.sport}
                                />
                            ) : (
                                <OtherTable
                                    key="Scroll_Sport2"
                                    title="Desporto"
                                    changeFunction={changeLeague}
                                    content={data.map((sport) => sport.name)}
                                    maybeError={formErrors.sport}
                                />
                            )}
                            {showForm ? (
                                <Scroll
                                    key="Scroll_Mod"
                                    title="Modalidade"
                                    changeFunction={changeTeams}
                                    content={getTeams()}
                                    maybeError={formErrors.teams}
                                />
                            ) : (
                                <OtherTable
                                    key="Scroll_Mod"
                                    title="Modalidade"
                                    changeFunction={changeTeams}
                                    content={getTeams()}
                                    maybeError={formErrors.teams}
                                />
                            )}

                            {showForm ? (
                                <Scroll
                                    key="Scroll_League"
                                    title="Liga"
                                    changeFunction={changeLeague}
                                    content={getLeagues()}
                                    maybeError={formErrors.league}
                                />
                            ) : (
                                <OtherTable
                                    key="Scroll_League"
                                    title="Liga"
                                    changeFunction={changeLeague}
                                    content={getLeagues()}
                                    maybeError={formErrors.league}
                                />
                            )}
                            <div className="flex flex-col items-start self-stretch flex-none order-1 h-12 px-20 justify-center   pt-10">
                                <div className="text-white h-12 p-2 w-24 gap-5 bg-red-600 rounded text-center	 ">
                                    <button type="submit">
                                        {/* FIXME Todos */}
                                        Registar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
