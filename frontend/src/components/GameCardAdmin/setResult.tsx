import {PrimaryButton} from '@components/Button';
import {HandleChangeProps, InputForm} from '@components/createBetter/inputForm';
import {
    EventMini,
    EventPost,
    EventToPost,
    ParticipantOddPost,
    ParticipantPost,
    TieOdd,
    TwoParticipantsPost,
    ValuePromo,
} from '@domain/Event';
import router from 'next/router';
import {useState} from 'react';
import {postEvent} from 'services/backend/event';
import {GameCardAdminProps} from '.';

export const SetResult = (game: GameCardAdminProps) => {
    const home = game.game.participants.home.participant;
    const away = game.game.participants.away.participant;

    const [resultHome, setResultHome] = useState<string>('0');
    const [resultAway, setResultAway] = useState<string>('0');
    const [error, setError] = useState<string>('');

    const changeHome = ({name, value}: HandleChangeProps) => {
        console.log(value);
        setResultHome(value);
    };
    const changeAway = ({name, value}: HandleChangeProps) => {
        console.log(value);
        setResultAway(value);
    };

    const submit = (e: React.MouseEvent<HTMLElement>) => {
        console.log('Submit');
        console.log(game.game);
        console.log('Res home: ', resultHome);
        console.log('Res away: ', resultAway);
    };

    const validate = () => {
        if (parseInt(resultHome) >= 0 && parseInt(resultAway) >= 0) {
            setError('');
            return true;
        } else {
            setError('Campos obrigatórios');
            return false;
        }
    };

    const handleSubmit: React.MouseEventHandler<
        HTMLButtonElement
    > = async () => {
        if (!validate()) {
            return;
        } else {
            console.log('Só devia estar aqui sem erros');
            console.log(game);
            // TODO: Make the request to the backend here
            const dateAndHour: string = game.game.date;
            const partipantHome: ParticipantPost = {
                Type: 'Team',
                Name: homeName as string,
                Players: [],
            };
            const participantHomeOdd: ParticipantOddPost = {
                Price: game.game.participants.home.participant.price,
                Participant: partipantHome,
                Promotion: 0,
                score: parseInt(resultHome),
            };
            const partipantAway: ParticipantPost = {
                Type: 'Team',
                Name: awayName as string,
                Players: [],
            };
            const participantAwayOdd: ParticipantOddPost = {
                Price: 0,
                Participant: partipantAway,
                Promotion: null,
                score: parseInt(resultAway),
            };
            const valuePromo: ValuePromo = {
                Value: 0,
            };
            const twoParticipant: TwoParticipantsPost = {
                Home: participantHomeOdd,
                Away: participantAwayOdd,
                Tie: game.game.participants.tie,
            };
            const event: EventToPost = {
                CompetitionId: game.game.competition as unknown as string,
                Date: dateAndHour,
                Completed: true,
                Participants: twoParticipant,
            };

            const newEvent: EventPost = {
                Sport: game.sport,
                Event: event,
            };
            console.log('Vai submeter resultado');
            console.log(newEvent);
            await postEvent(newEvent);
            await router.push('/success');
        }
    };

    const homeName = game.game.participants.home.participant.participantName
        ? game.game.participants.home.participant.participantName
        : 'Home team';
    const awayName = game.game.participants.away.participant.participantName
        ? game.game.participants.away.participant.participantName
        : 'Away team';

    return (
        <div className="flex flex-col gap-3 p-5">
            <div className="text-lg font-semibold pb-2 border-b">
                Insere o resultado do jogo
            </div>
            <div>Insira o resultado das duas equipas.</div>
            <div className=" relative z-0">
                <InputForm
                    type="number"
                    name={`Pontos ${homeName}`}
                    id="odd_home"
                    value={resultHome}
                    handleChange={changeHome}
                    error={''}
                />
                <InputForm
                    type="number"
                    name={`Pontos ${awayName}`}
                    id="odd_home"
                    value={resultAway}
                    handleChange={changeAway}
                    error={''}
                />
            </div>
            {error.length > 0 && (
                <div className="text-base mt-1 text-IMPERIAL_RED">{error}</div>
            )}
            <div className="flex items-center justify-center gap-10">
                <PrimaryButton onClick={handleSubmit}>
                    <div>Submit</div>
                </PrimaryButton>
            </div>
        </div>
    );
};
