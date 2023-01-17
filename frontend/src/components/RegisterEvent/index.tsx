import React, {useEffect, useState} from 'react';
import {SearchBox} from './searchBox';
import {Table} from './table';
import {PrimaryButton} from '@components/Button';
import {
    EventPost,
    EventToPost,
    ParticipantMesmo,
    ParticipantOddPost,
    postEvent,
    TwoParticipantsPost,
} from 'services/backend/event';
import {Modal} from '@components/Modal';
import {Sport, TieOdd, ValuePromo} from '@domain/Event';

export interface RegisterEventProps {
    sports: Sport[];
}

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
    const [sportName, setSportName] = useState<string>(sports[0].name);
    const [sportSelected, setSportSelected] = useState<boolean>(false);

    const [league, setLeague] = useState<string>('');
    const [leagueSelected, setLeagueSelected] = useState<boolean>(false);

    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

    // Handle submit part
    const [errors, setErrors] = useState<FormErrors>(initialFormErrors);

    const [date, setDate] = useState<string>('');
    const [hour, setHour] = useState<string>('');
    const [sucess, setSucess] = useState<boolean>(false);

    let possibleLeagues = sportSelected
        ? sports.filter((sportInfo: Sport) => sportInfo.name == sportName)[0]
              .competitions
        : [];

    let possibleTeams = sportSelected
        ? sports.filter((sportInfo: Sport) => sportInfo.name == sportName)[0]
              .teams
        : [];

    const changeTeams = (team: string, selected: boolean) => {
        if (selected) {
            setSelectedTeams([...selectedTeams, team]);
        } else {
            setSelectedTeams(selectedTeams.filter((t) => t !== team));
        }
    };

    // Necessary to update the leagues and teams associated to the sportName
    useEffect(() => {
        if (sportSelected) {
            setSelectedTeams([]);
            setSportSelected(true);
        }
    }, [sportSelected]);

    const today = new Date().toISOString().split('T')[0];

    const changeDate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setDate(e.target.value);
    };

    const changeHour: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setHour(e.target.value);
    };

    const hasErrors = () => {
        let errors_now = validate();
        return Object.values(errors_now).some((err) => err !== '');
    };

    const handleSubmit: React.MouseEventHandler<
        HTMLButtonElement
    > = async () => {
        validate();

        if (hasErrors()) {
            return;
        } else {
            console.log('Só devia estar aqui sem erros');
            // TODO: Make the request to the backend here
            const dateAndHour: string = `${date}T${hour}:17.0065405+00:00`;
            const partipantHome: ParticipantMesmo = {
                Price: 0,
                Promo: null,
                PartId: selectedTeams[0],
            };
            const participantHomeOdd: ParticipantOddPost = {
                Score: 0,
                Participant: partipantHome,
            };
            const partipantAway: ParticipantMesmo = {
                Price: 0,
                PartId: selectedTeams[1],
                Promo: null,
            };
            const participantAwayOdd: ParticipantOddPost = {
                Participant: partipantAway,
                Score: 0,
            };
            const valuePromo: ValuePromo = {
                Value: 0,
            };
            const tieOdd: TieOdd = {
                price: 0,
                promo: valuePromo,
            };
            const twoParticipant: TwoParticipantsPost = {
                Home: participantHomeOdd,
                Away: participantAwayOdd,
                Tie: tieOdd,
            };
            const event: EventToPost = {
                CompetitionId: league,
                Date: dateAndHour,
                Completed: false,
                Participants: twoParticipant,
            };

            const newEvent: EventPost = {
                Sport: sportName,
                Event: event,
            };
            console.log('Sucesso?');
            console.log(newEvent);
            await postEvent(newEvent);
            setSucess(true);
        }

        // TODO: Make the request to the backend here
        const dateAndHour: string = `${date}T${hour}:17.0065405+00:00`;

        const participantAwayMesmo: ParticipantMesmo = {
            Price: 0,
            PartId: selectedTeams[1],
            Promo: null,
        };
        const participantHomeMesmo: ParticipantMesmo = {
            Price: 0,
            PartId: selectedTeams[0],
            Promo: null,
        };

        const participantAwayOdd: ParticipantOddPost = {
            Score: 0,
            Participant: participantAwayMesmo,
        };
        const participantHomeOdd: ParticipantOddPost = {
            Score: 0,
            Participant: participantHomeMesmo,
        };
        const valuePromo: ValuePromo = {
            Value: 0,
        };
        const tieOdd: TieOdd = {
            price: 0,
            promo: valuePromo,
        };
        const twoParticipant: TwoParticipantsPost = {
            Home: participantHomeOdd,
            Away: participantAwayOdd,
            Tie: tieOdd,
        };
        const eventToPost: EventToPost = {
            CompetitionId: league,
            Date: dateAndHour,
            Completed: false,
            Participants: twoParticipant,
        };
        const newEvent: EventPost = {
            Sport: sportName,
            Event: eventToPost,
        };

        await postEvent(newEvent);
        //await router.push('/success');
    };

    const validate = () => {
        let errors: FormErrors = {...initialFormErrors};

        // FIXME em todos
        if (!sportSelected) {
            errors.sport = 'Obrigatório';
        } else {
            if (selectedTeams.length === 0) {
                errors.teams = 'Número de equipas insuficiente.';
            }
        }

        if (!leagueSelected) {
            errors.league = 'Obrigatório';
        }
        const sportInfo = sports.filter(
            (sportInList) => sportInList.name === sportName
        )[0];

        if (leagueSelected && !sportInfo.competitions.includes(league)) {
            errors.league = 'Liga não disponível na modalidade';
        }

        if (!date) {
            errors.date = 'Obrigatório';
        }

        if (!hour) {
            errors.hour = 'Obrigatório';
        }

        setErrors(errors);
        return errors;
    };

    return (
        <div className="h-screen w-screen justify-center flex items-center bg-CULTURED">
            {sucess && (
                <Modal setIsOpen={setSucess} isOpen={sucess}>
                    <div className="bg-white flex flex-col items-center px-10 py-10 h-auto relative gap-5 ">
                        <div className="w-fit text-4xl">
                            Evento submetido com sucesso
                        </div>
                        <PrimaryButton onClick={() => setSucess(false)}>
                            Adicionar novo jogo?
                        </PrimaryButton>
                    </div>
                </Modal>
            )}
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
                        currentSearch={sportName}
                        changeCurrentSearch={setSportName}
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
                                setValue={changeTeams}
                                results={possibleTeams}
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
