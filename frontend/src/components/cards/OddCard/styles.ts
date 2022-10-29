import {PALETTE} from '../../../constants/Palette';

export const ODD_CARD_STYLE = {
    paddingY: '1vh',
    paddingX: '2vw',
    //width: '6vw',
    //height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: PALETTE.SPECIAL,
    ':hover': {
        background: PALETTE.SPECIAL_DARK,
    },
    cursor: 'pointer',
};
