import React, {useState} from 'react';
import {NavBarBody} from './navbarBody';
import {PaymentModal} from '@components/PaymentModal';
import {useProfile} from '@hooks/useProfile';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {Balance, setBalance} = useProfile();

    return (
        <div>
            <NavBarBody setOpen={setIsOpen} />
            <PaymentModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                balance={Balance}
                setBalance={setBalance}
            />
        </div>
    );
};
