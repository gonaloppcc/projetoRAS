import {PrimaryButton} from '@components/Button';
import {HandleChangeProps, InputForm} from '@components/createBetter/inputForm';
import {EventMini} from '@domain/Event';
import {useState} from 'react';
import {GameCardAdminProps} from '.';

export const SetResult = (game: GameCardAdminProps) => {
    const home = game.game.participants.home.participant;
    const away = game.game.participants.away.participant;

    const [resultHome, setResultHome] = useState<string>('0');
    const [resultAway, setResultAway] = useState<string>('0');

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

    const homeName = game.game.participants.home.participant.participantName
        ? game.game.participants.home.participant.participantName
        : 'Home team';
    const awayName = game.game.participants.away.participant.participantName
        ? game.game.participants.away.participant.participantName
        : 'Away team';

    return (
        <div className="flex flex-col gap-3 p-5">
            <div className="text-lg font-semibold pb-2 border-b">
                Insere a odd do jogo
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

            <div className="flex items-center justify-center gap-10">
                <PrimaryButton onClick={submit}>
                    <div>Submit</div>
                </PrimaryButton>
            </div>
        </div>
    );
};
