import React, {useState, useEffect} from 'react';
import {Modal} from '@components/Modal';
import {NavBarBody} from './navbarBody';
import {PaymentMethod} from './paymentMethod';

const BALANCE = 100; // FIXME: This should be the user's balance
export const Navbar = () => {
    const [balance, setBalance] = useState(BALANCE);
    /*
    Menu 0: Choose between deposit and wihdraw
    Menu 1: Choose transfer method 
    Menu 3: Say congratulations
    */
    const [currentMenu, setCurrentMenu] = useState(0);
    const [deposit, setDeposit] = useState(true);

    return (
        <div>
            {open && currentMenu === 1 && (
                <Modal
                    open={open}
                    setOpen={setOpen}
                    content={
                        <PaymentMethod
                            changeBalance={setBalance}
                            balance={balance}
                            setMenu={setCurrentMenu}
                            isDepositing={deposit}
                        />
                    }
                />
            )}
            {!open && <NavBarBody setOpen={setOpen} />}
        </div>
    );
};
