import {ClassNames} from '@emotion/react';
import React, {useEffect, useState} from 'react';
import {InputForm} from './inputForm';
export const CreateBetter = () => {
    const intialValues = {
        username: '',
        mail: '',
        password: '',
        nif: '',
        phone: '',
        numberCC: '',
    };

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
        const mail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        // Phone numbers, cc, nifs all with 9 numbers
        const numbers = /^\d{9}$/i;
        const username = /^[\d\w$]{1,10}/i;

        if (!values.username) {
            errors.username = 'Obrigatório';
        } else if (!username.test(values.username)) {
            errors.username = 'Nome inválido';
        }

        if (!values.password) {
            errors.password = 'Obrigatório';
        } else if (values.password.length < 4) {
            errors.password = 'Password tem de ter mais de 4 carateres';
        }

        if (!values.mail) {
            errors.mail = 'Obrigatório';
        } else if (!mail.test(values.mail)) {
            errors.mail = 'Mail incorreto';
        }

        if (!values.nif) {
            errors.nif = 'Obrigatório';
        } else if (!numbers.test(values.nif)) {
            errors.nif = 'NIF inválido (9 carateres)';
        }

        if (!values.phone) {
            errors.phone = 'Obrigatório';
        } else if (!numbers.test(values.phone)) {
            errors.phone = 'Número de telemóvel errado';
        }
        if (!values.numberCC) {
            errors.numberCC = 'Obrigatório';
        } else if (!numbers.test(values.numberCC)) {
            errors.numberCC = 'Número de telemóvel errado';
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
            <div className="bg-white w-auto flex flex-col items-center px-10 pt-10 pb-10 h-auto gap-10 relative ">
                <div className="w-24 h-10  not-italic font-normal text-3xl leading-10 text-black flex-none order-none flex-grow-0">
                    Registo
                </div>
                <div className="flex flex-col items-start flex-none order-1">
                    <div className="flex-none order-none  ">
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="gap-5"
                        >
                            <InputForm
                                htmlFor="text"
                                name="Nome de utilizador"
                                id="username"
                                value={formValues.username}
                                handleChange={handleChange}
                                error={formErrors.username}
                            />

                            <InputForm
                                htmlFor="password"
                                name="Palavra-passe"
                                id="password"
                                value={formValues.password}
                                handleChange={handleChange}
                                error={formErrors.password}
                            />
                            <InputForm
                                htmlFor="email"
                                name="Email"
                                id="mail"
                                value={formValues.mail}
                                handleChange={handleChange}
                                error={formErrors.mail}
                            />
                            <InputForm
                                htmlFor="number"
                                name="NIF"
                                id="nif"
                                value={formValues.nif}
                                handleChange={handleChange}
                                error={formErrors.nif}
                            />
                            <InputForm
                                htmlFor="tel"
                                name="Número telemóvel"
                                id="phone"
                                value={formValues.phone}
                                handleChange={handleChange}
                                error={formErrors.phone}
                            />
                            <InputForm
                                htmlFor="number"
                                name="Número Cartão de Cidadão"
                                id="numberCC"
                                value={formValues.numberCC}
                                handleChange={handleChange}
                                error={formErrors.numberCC}
                            />
                            <div className="flex flex-col items-start self-stretch flex-none order-1 px-20 justify-center pt-1 pb-10">
                                <div className="flex flex-row items-start self-stretch flex-none order-none h-12 p-2 w-24 gap-5 bg-red-600 rounded justify-center ">
                                    <button type="submit">
                                        <div className="flex items-center flex-none order-none font-normal text-2xl leading-7 text-center text-white not-italic w-20 "></div>
                                        Registar
                                    </button>
                                </div>
                            </div>
                            <div className="flex-none order-2  ">
                                <div className="text-center	">
                                    <a
                                        href="/general"
                                        className="flex-none order-2 h text-lg"
                                    >
                                        Já tem conta? Faça login!
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
