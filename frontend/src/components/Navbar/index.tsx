import React, {useState} from 'react';
import {NavBarBody} from './navbarBody';
import {PaymentModal} from '@components/PaymentModal';
import {useProfile} from '@state/useProfile';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {balance, setBalance} = useProfile();

    return (
        <div>
            <NavBarBody setOpen={setIsOpen} />
            <PaymentModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                balance={balance}
                setBalance={setBalance}
            />
        </div>
    );
};
