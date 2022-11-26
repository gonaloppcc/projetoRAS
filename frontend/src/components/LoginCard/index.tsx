import {ClassNames} from '@emotion/react';
import React, {useEffect, useState} from 'react';
import {InputForm} from '../createBetter/inputForm';
import {REGEX_MAIL} from '../../utils/regex';

import {Fragment, useRef} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {ExclamationTriangleIcon} from '@heroicons/react/24/outline';

export const LoginCard = () => {
    const intialValues = {email: '', password: ''};

    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {
        console.log('Submissão feita');
        console.log(formValues);
    };

    //input change handler
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };

    //form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
    };

    //form validation handler
    const validate = (values) => {
        let errors = {};

        {
            /*  FIXME EM TODOS*/
        }
        if (!values.email) {
            errors.email = 'Cannot be blank';
        } else if (!REGEX_MAIL.test(values.email)) {
            errors.email = 'Invalid email format';
        }

        if (!values.password) {
            errors.password = 'Cannot be blank';
        } else if (values.password.length < 4) {
            errors.password = 'Password must be more than 4 characters';
        }

        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit();
        }
    }, [formErrors]);

    const [open, setOpen] = useState(false);

    const cancelButtonRef = useRef(null);

    const forgetPasswordContent = () => {
        return (
            <>
                <div className="flex flex-col gap-3 p-5">
                    <div className="text-lg  pl-6 pb-2">
                        Esqueci-me da password
                    </div>
                    <div>
                        Foi enviado um mail para o endereço #####, com um código
                        de verificação.
                    </div>
                    <div class=" relative z-0">
                        <input
                            type="text"
                            id="floating_standard"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            for="floating_standard"
                            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Code
                        </label>
                        <div className="pt-4">
                            <button type="submit">
                                <div className="flex items-center inline-block align-middle flex-none order-none font-normal text-2xl leading-7 text-center text-white not-italic w-20 "></div>
                                {/*  FIXME */}
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const Modal = (props) => {
        return (
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-90"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-90"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-300 bg-opacity-90 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-90 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-90 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    {props.content}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        );
    };

    const LoginBody = () => {
        return (
            <div className="h-screen w-screen justify-center flex items-center bg-CULTURED">
                <div className="bg-white w-auto flex flex-col items-center px-10 pt-10 pb-20 h-auto  relative ">
                    <div className="w-24 h-10 not-italic font-normal text-3xl leading-10 text-black flex-none order-none flex-grow-0">
                        Entrar
                    </div>
                    <div className="flex flex-col items-start flex-none order-1   gap-12 ">
                        <div className="flex-none order-none  ">
                            <form
                                onSubmit={handleSubmit}
                                noValidate
                                className=" gap-5"
                            >
                                {/*  FIXME EM TODOS*/}
                                <InputForm
                                    htmlFor="email"
                                    name="Email"
                                    id="email"
                                    value={formValues.email}
                                    handleChange={handleChange}
                                    error={formErrors.email}
                                />
                                <InputForm
                                    htmlFor="password"
                                    name="Palavra-passe"
                                    id="password"
                                    value={formValues.password}
                                    handleChange={handleChange}
                                    error={formErrors.password}
                                />
                                <div className="flex flex-col pt-5 items-start self-stretch flex-none order-1 h-12 px-20 justify-center pb-20 ">
                                    <div className="flex flex-row items-start self-stretch flex-none order-none h-12 p-2 w-24 gap-5 bg-red-600 rounded justify-center ">
                                        <button type="submit">
                                            <div className="flex items-center inline-block align-middle flex-none order-none font-normal text-2xl leading-7 text-center text-white not-italic w-20 "></div>
                                            {/*  FIXME */}
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-none order-2 h-12 ">
                                    <div className="text-center	">
                                        <a
                                            href="/register"
                                            className="flex-none order-2 h text-lg"
                                        >
                                            {/*  FIXME */}
                                            Não tem conta? Registe-se agora!
                                        </a>
                                    </div>
                                    <div className="text-center	">
                                        <div
                                            className="flex-none order-2 cursor-pointer text-lg"
                                            onClick={() => setOpen(true)}
                                        >
                                            {/*  FIXME */}
                                            Esqueci-me da palavra-passe
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            {open && <Modal content={forgetPasswordContent} />}
            <LoginBody />
        </div>
    );
};
