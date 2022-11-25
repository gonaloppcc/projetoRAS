import {ClassNames} from '@emotion/react';
import React, {useEffect, useState} from 'react';
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
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.email) {
            errors.email = 'Cannot be blank';
        } else if (!regex.test(values.email)) {
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

    return (
        <div className="h-screen w-screen justify-center flex items-center bg-CULTURED">
            <div className="bg-white flex flex-col items-center px-10 py-12 h-max absolute gap-10 ">
                <div className="w-24 h-10 not-italic font-normal text-3xl leading-10 text-black flex-none order-none flex-grow-0">
                    Entrar
                </div>
                <div className="flex flex-col items-start flex-none order-1 h-48  gap-12 w-64">
                    {/* Input boxes*/}
                    <div className="flex-none order-none h-20 w-64 ">
                        {/*{Object.keys(formErrors).length === 0 &&
                            isSubmitting && (
                                <span className="rounded inline-block font-semibold text-xl mb-4 p-2 text-center w-full text-white bg-green-400">
                                    Form submitted successfully
                                </span>
                            )} */}
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="h-fit"
                        >
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                    className={
                                        formErrors.email
                                            ? 'border-red-500 border-2'
                                            : 'border-black border-b-2'
                                    }
                                />
                                {formErrors.email && (
                                    <span className="text-base mt-1 text-red-500">
                                        {formErrors.email}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col mb-6 pb-6">
                                <label htmlFor="password">Palavra-passe</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formValues.password}
                                    onChange={handleChange}
                                    className={
                                        formErrors.password
                                            ? 'border-red-500 border-2'
                                            : 'border-black border-b-2'
                                    }
                                />
                                {formErrors.password && (
                                    <span className="text-base mt-1 text-red-500">
                                        {formErrors.password}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col items-start self-stretch flex-none order-1 h-12 px-20 justify-center pb-20 ">
                                <div className="flex flex-row items-start self-stretch flex-none order-none h-12 p-2 w-24 gap-5 bg-red-600 rounded justify-center ">
                                    <button type="submit">
                                        <div className="flex items-center flex-none order-none font-normal text-2xl leading-7 text-center text-white not-italic w-20 "></div>
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="flex-none order-2 h-12 pu    w-72">
                            <div className="text-center	">
                                <a
                                    href="https://www.youtube.com/watch?v=E_i0iVloA18&list=TLPQMjUxMTIwMjJxDb98oNzlJA&index=7&ab_channel=WetBedGang"
                                    className="flex-none order-2 h text-lg"
                                >
                                    Não tem conta? Registe-se agora!
                                </a>
                            </div>
                            <div className="text-center	">
                                <a
                                    href="https://www.youtube.com/watch?v=E_i0iVloA18&list=TLPQMjUxMTIwMjJxDb98oNzlJA&index=7&ab_channel=WetBedGang"
                                    className="flex-none order-2  text-lg"
                                >
                                    Esqueci-me da palavra-passe
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
