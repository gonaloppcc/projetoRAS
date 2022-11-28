import React, {useState, useEffect} from 'react';
import {Modal} from '@components/Modal';
import {NavBarBody} from './navbarBody';
import {PaymentMethod} from './paymentMethod';
import {DepositOrwithdraw} from './depositOrwithdraw';
import {FinishTransfer} from './finishTransfer';

const BALANCE = 100; // FIXME: This should be the user's balance
export const Navbar = () => {
    const [balance, setBalance] = useState(BALANCE);
    const [open, setOpen] = useState<boolean>(false);
    /*
    Menu 0: Choose between deposit and wihdraw
    Menu 1: Choose transfer method 
    Menu 3: Say congratulations
    */
    const [currentMenu, setCurrentMenu] = useState<number>(0);
    const [deposit, setDeposit] = useState<boolean>(true);

    const closeModal = (open: boolean) => {
        setOpen(open);
        setCurrentMenu(0);
    };

    return (
        <div>
            {open && currentMenu === 0 && (
                <Modal
                    open={open}
                    setOpen={closeModal}
                    content={
                        <DepositOrwithdraw
                            setMenu={setCurrentMenu}
                            setDepositing={setDeposit}
                        />
                    }
                />
            )}
            {open && currentMenu === 1 && (
                <Modal
                    open={open}
                    setOpen={closeModal}
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
            {open && currentMenu === 3 && (
                <Modal
                    open={open}
                    setOpen={closeModal}
                    content={
                        <FinishTransfer
                            setOpen={setOpen}
                            isDepositing={deposit}
                        />
                    }
                />
            )}
            <NavBarBody setOpen={closeModal} />
        </div>
    );
};
