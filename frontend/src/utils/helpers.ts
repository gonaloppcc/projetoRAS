import {Participants} from '@domain/Event';
import {Odd} from '@domain/Bet';

export function getOddsFromParticipants(participants: Participants): Odd[] {
    const homeName = participants.home.participant.participantName;
    const awayName = participants.away.participant.participantName;

    return [
        {
            id: participants.home.participant.id,
            partId: homeName,
            price: participants.home.participant.price,
        },
        {
            id: participants.tie.id,
            partId: 'Empate',
            price: participants.tie.price,
        },
        {
            id: participants.away.participant.id,
            partId: awayName,
            price: participants.away.participant.price,
        },
    ];
}
