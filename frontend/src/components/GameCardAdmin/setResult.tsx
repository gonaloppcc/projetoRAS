import {PrimaryButton} from '@components/Button';
import {HandleChangeProps, InputForm} from '@components/createBetter/inputForm';
import {
    EventReceived,
    EventPost,
    EventToPost,
    ParticipantMesmo,
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

export interface InsertDataModal {
    game: EventReceived;
    sport: string;
    textPropsUp: string;
    textSucess: string;
    resultOrOdd: boolean;
    textSet: string;
}

export const SetResult = ({
    game,
    sport,
    textPropsUp,
    textSucess,
    resultOrOdd,
    textSet,
}: InsertDataModal) => {
    const home = game.participants.home.participant;
    const away = game.participants.away.participant;

    const [valueHome, setValueHome] = useState<string>('0');
    const [valueAway, setValueAway] = useState<string>('0');
    const [error, setError] = useState<string>('');
    const [submitted, setSubmitted] = useState(false);

    const changeHome = ({name, value}: HandleChangeProps) => {
        console.log(value);
        setValueHome(value);
    };
    const changeAway = ({name, value}: HandleChangeProps) => {
        console.log(value);
        setValueAway(value);
    };

    const validate = () => {
        if (parseInt(valueHome) >= 0 && parseInt(valueAway) >= 0) {
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
            const dateAndHour: string = game.date;
            const partipantHome: ParticipantMesmo = {
                Price: !resultOrOdd ? game.participants.home.participant.price : parseInt(valueHome),
                PartId: homeName,
                Promo: null,
            };
            const participantHomeOdd: ParticipantOddPost = {
                Participant: partipantHome,
                Score: resultOrOdd ? parseInt(valueHome) : 0,
            };
            const partipantAway: ParticipantMesmo = {
                Price: !resultOrOdd ? game.participants.away.participant.price : parseInt(valueAway),
                Promo: null,
                PartId: awayName,
            };
            const participantAwayOdd: ParticipantOddPost = {
                Participant: partipantAway,
                Score: resultOrOdd ? parseInt(valueAway) : 0,
            };
            const valuePromo: ValuePromo = {
                Value: 0,
            };
            const tie: TieOdd = {
                Id: game.participants.tie.id,
                Price: game.participants.tie.price,
                Promo: game.participants.tie.promo,
            };
            const twoParticipant: TwoParticipantsPost = {
                Home: participantHomeOdd,
                Away: participantAwayOdd,
                Tie: tie,
            };
            const event: EventToPost = {
                CompetitionId: game.competition,
                Date: dateAndHour,
                Completed: true,
                Participants: twoParticipant,
            };

            const newEvent: EventPost = {
                Sport: sport,
                Event: event,
            };
            await postEvent(newEvent);
            setSubmitted(true);
        }
    };

    const homeName = game.participants.home.participant.participantName
        ? game.participants.home.participant.participantName
        : 'Home team';
    const awayName = game.participants.away.participant.participantName
        ? game.participants.away.participant.participantName
        : 'Away team';

    return (
        <div className="flex flex-col gap-3 p-5">
            {submitted && (
                <div className="text-lg font-semibold pb-2 border-b">
                    {textSucess}
                </div>
            )}
            {!submitted && (
                <>
                    <div className="text-lg font-semibold pb-2 border-b">
                        {textPropsUp}
                    </div>
                    <div className=" relative z-0">
                        <InputForm
                            type="number"
                            name={`${textSet} ${homeName}`}
                            id="odd_home"
                            value={valueHome}
                            handleChange={changeHome}
                            error={''}
                        />
                        <InputForm
                            type="number"
                            name={`${textSet} ${awayName}`}
                            id="odd_home"
                            value={valueAway}
                            handleChange={changeAway}
                            error={''}
                        />
                    </div>
                    {error.length > 0 && (
                        <div className="text-base mt-1 text-IMPERIAL_RED">
                            {error}
                        </div>
                    )}
                    <div className="flex items-center justify-center gap-10">
                        <PrimaryButton onClick={handleSubmit}>
                            <div>Submeter</div>
                        </PrimaryButton>
                    </div>
                </>
            )}
        </div>
    );
};
