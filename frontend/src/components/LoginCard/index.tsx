import React, {useState} from 'react';
import {Modal} from '@components/Modal';
import {ForgetPassword} from './forgetPassword';
import {LoginBody} from '@components/LoginCard/LoginBody';

export const LoginCard = () => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            {open && (
                <Modal open={open} setOpen={setOpen}>
                    <ForgetPassword />
                </Modal>
            )}

            <LoginBody setOpen={setOpen} />
        </div>
    );
};
