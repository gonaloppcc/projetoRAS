import React, {useEffect, useState} from 'react';
import {LoginBody} from './loginBody';
import {Modal} from '@components/Modal';
import {ForgetPassword} from './forgetPassword';

export const LoginCard = () => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            {open && (
                <Modal
                    open={open}
                    setOpen={setOpen}
                    content={
                        <ForgetPassword
                            code_generated={Math.floor(Math.random() * 100)}
                        />
                    }
                />
            )}

            <LoginBody setOpen={setOpen} />
        </div>
    );
};
