import React, {useState} from 'react';
import {Modal} from '@components/Modal';
import {ForgetPassword} from './forgetPassword';
import {LoginBody} from '@components/RegisterSpecialist/LoginBody';

export const LoginCard = () => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            {open && (
                <Modal isOpen={open} setIsOpen={setOpen}>
                    <ForgetPassword />
                </Modal>
            )}

            <LoginBody setOpen={setOpen} />
        </div>
    );
};
