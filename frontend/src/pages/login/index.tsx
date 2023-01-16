import type {NextPage} from 'next';
import {LoginBody} from '@components/RegisterSpecialist/LoginBody';
import {ForgetPassword} from '@components/ForgetPassword';
import {useState} from 'react';
import {Modal} from '@components/Modal';

const Home: NextPage = () => {
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

export default Home;
