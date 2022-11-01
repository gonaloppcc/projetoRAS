import {PALETTE} from '../../../constants/PALETTE';

export const EVENT_CARD_STYLE = {
    minWidth: '400px',
    minHeight: '80px',
    width: '100%',
    height: '10vh',
    msFilter: 'drop-shadow(0px 0px 5px #000000)',

    paddingX: '2vh',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
};

export const EVENT_CARD_LEFT_STYLE = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
};

export const EVENT_CARD_RIGHT_STYLE = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '1vw',

    padding: '2vh',
};

export const EVENT_CARD_WINNINGS_STYLE = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    paddingX: '2vw',
    marginRight: '2vw',
    //alignItems: 'flex-start',

    //color: PALETTE.WHITE,
};

export const EVENT_CARD_WIN = {
    background: PALETTE.RIGHT_GREEN,
    //fontWeight: 100,
};

export const EVENT_CARD_LOST = {
    background: PALETTE.IMPERIAL_RED,
};
