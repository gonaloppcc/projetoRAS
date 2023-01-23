import React, {useState} from 'react';
import {NavBarBody} from './navbarBody';
import {PaymentModal} from '@components/PaymentModal';
import {useProfile} from '@state/useProfile';

export const Navbar = () => {
    const [isPaymentModalOpen, setIsPaymentModalOpen] =
        useState<boolean>(false);

    const {isLoggedIn, balance, setBalance} = useProfile();

    return (
        <div>
            <NavBarBody setPaymentModalOpen={setIsPaymentModalOpen} />
            <PaymentModal
                isOpen={isPaymentModalOpen}
                setIsOpen={setIsPaymentModalOpen}
                balance={balance}
                setBalance={setBalance}
            />
        </div>
    );
};
