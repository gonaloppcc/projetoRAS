import {PALETTE} from '../../constants/Palette';
import {CSSProperties} from 'react';

export const CardStyles: CSSProperties = {
    padding: '2vh',
    //maxHeight: '100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //gap: '5vw',
    borderRadius: '1%',
    borderStyle: 'solid',
    borderColor: PALETTE.FADE_BLACK,
    borderWidth: '1px',
    boxShadow: 'none',
};
