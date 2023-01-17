import {Participants} from '@domain/Event';
import {ParticipantOdd} from '@domain/Bet';

export function getOddsFromParticipants(
    participants: Participants
): ParticipantOdd[] {
    const homeName = participants.home.participant.participantName;
    const awayName = participants.away.participant.participantName;

    return [
        {
            type: 'ParticipantOdd',
            id: participants.home.participant.id,
            participantName: homeName,
            price: participants.home.participant.price,
        },
        {
            type: 'ParticipantOdd',
            id: participants.tie.id,
            participantName: 'Empate',
            price: participants.tie.price,
        },
        {
            type: 'ParticipantOdd',
            id: participants.away.participant.id,
            participantName: awayName,
            price: participants.away.participant.price,
        },
    ];
}
