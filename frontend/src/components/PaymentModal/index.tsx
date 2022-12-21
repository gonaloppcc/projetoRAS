import React, {useState} from 'react';
import {Modal} from '@components/Modal';
import {DepositOrWithdraw} from '@components/Navbar/depositOrWithdraw';
import {PaymentMethod} from '@components/Navbar/paymentMethod';
import {FinishTransfer} from '@components/Navbar/finishTransfer';

export interface PaymentModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    balance: number;
    setBalance: (balance: number) => void;
}

export const PaymentModal = ({
    isOpen,
    setIsOpen,
    balance,
    setBalance,
}: PaymentModalProps) => {
    /*
    Menu 0: Choose between deposit and wihdraw
    Menu 1: Choose transfer method
    Menu 3: Say congratulations
    */
    const [currentMenu, setCurrentMenu] = useState<number>(0);
    const [deposit, setDeposit] = useState<boolean>(true);

    const closeModal = () => {
        setIsOpen(false);
        setCurrentMenu(0);
    };

    return (
        <div>
            {isOpen && currentMenu === 0 && (
                <Modal isOpen={isOpen} setIsOpen={closeModal}>
                    <DepositOrWithdraw
                        setMenu={setCurrentMenu}
                        setDepositing={setDeposit}
                    />
                </Modal>
            )}
            {isOpen && currentMenu === 1 && (
                <Modal isOpen={isOpen} setIsOpen={closeModal}>
                    <PaymentMethod
                        setMenu={setCurrentMenu}
                        isDepositing={deposit}
                    />
                </Modal>
            )}
            {isOpen && currentMenu === 3 && (
                <Modal isOpen={isOpen} setIsOpen={closeModal}>
                    <FinishTransfer
                        setOpen={setIsOpen}
                        isDepositing={deposit}
                    />
                </Modal>
            )}
        </div>
    );
};
