import React, {useEffect, useState} from 'react';
import {InputForm} from '../createBetter/inputForm';
import {Modal} from '../Modal/index';
import {REGEX_MAIL} from '../../utils/regex';
import emailjs from '@emailjs/browser';

import {useRef} from 'react';
import {ForgetPassword} from './forgetPassword';

export const LoginCard = () => {
    const intialValues = {email: '', password: '', emailRecover: ''};

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
        if (!values.emailRecover) {
            errors.emailRecover = 'Cannot be blank';
        } else if (!REGEX_MAIL.test(values.emailRecover)) {
            errors.emailRecover = 'Invalid email format';
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
                                    <RedButton text={'Sign in'} />
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
    const RedButton = (props) => {
        return (
            <div
                onClick={props.onClick}
                className=" items-start text-white	align-baseline	 h-12 p-2 w-24  bg-red-600 text-center	rounded"
            >
                <button type="submit">{props.text}</button>
            </div>
        );
    };
    return (
        <div>
            {open && (
                <Modal
                    open={open}
                    setOpen={setOpen}
                    content={
                        <ForgetPassword
                            code_generated={Math.floor(Math.random() * 100)}
                            mail={'MAIL USER'}
                        />
                    }
                />
            )}

            <LoginBody />
        </div>
    );
};
