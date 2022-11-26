import React, {useEffect, useState} from 'react';
import {InputForm} from '../createBetter/inputForm';
import {Modal} from '../Modal/index';
import {REGEX_MAIL} from '../../utils/regex';

import {useRef} from 'react';

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
                            <RedButton text={'Reset'} />{' '}
                        </div>
                    </div>
                </div>
            </>
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
            <div className=" items-start text-white	align-baseline	 h-12 p-2 w-24  bg-red-600 text-center	rounded">
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
                    content={forgetPasswordContent}
                />
            )}

            <LoginBody />
        </div>
    );
};
