import {green, red} from '@mui/material/colors';

export const EVENT_CARD_STYLE = {
    minWidth: '400px',
    minHeight: '80px',
    width: '100%',
    height: '10vh',
    msFilter: 'drop-shadow(0px 0px 5px #000000)',

    padding: '2vh',

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
export const EVENT_CARD_LEFT_STYLE1 = {
    minWidth: '400px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1vw',
};
export const EVENT_CARD_RIGHT_STYLE = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '1vw',
};

export const EVENT_CARD_WIN = {
    backgroundColor: green,
    //fontWeight: 100,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    //alignItems: 'flex-start',
};
export const EVENT_CARD_LOST = {
    backgroundColor: red,
    fontWeight: 50,
};
