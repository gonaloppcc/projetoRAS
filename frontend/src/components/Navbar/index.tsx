import React, {useState} from 'react';
import {Modal} from '@components/Modal';
import {NavBarBody} from './navbarBody';
import {PaymentMethod} from './paymentMethod';
import {DepositOrWithdraw} from './depositOrWithdraw';
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
                <Modal open={open} setOpen={closeModal}>
                    <DepositOrWithdraw
                        setMenu={setCurrentMenu}
                        setDepositing={setDeposit}
                    />
                </Modal>
            )}
            {open && currentMenu === 1 && (
                <Modal open={open} setOpen={(e) => console.log(e)}>
                    <PaymentMethod
                        changeBalance={setBalance}
                        balance={balance}
                        setMenu={setCurrentMenu}
                        isDepositing={deposit}
                    />
                </Modal>
            )}
            {open && currentMenu === 3 && (
                <Modal open={open} setOpen={closeModal}>
                    <FinishTransfer setOpen={setOpen} isDepositing={deposit} />
                </Modal>
            )}
            <NavBarBody setOpen={closeModal} />
        </div>
    );
};
