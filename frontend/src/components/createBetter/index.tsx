import React, {useEffect, useState} from 'react';
import {HandleChangeProps, InputForm} from '@components/createBetter/inputForm';
import {REGEX_MAIL, REGEX_NUMBERS, REGEX_USERNAME} from '../../utils/regex';

interface ValuesProps {
    password: string;
    mail: string;
    phone: string;
    numberCC: string;
    nif: string;
    username: string;
}

type ErrorsProps = ValuesProps;

const initialValues: ValuesProps = {
    username: '',
    mail: '',
    password: '',
    nif: '',
    phone: '',
    numberCC: '',
};

export const CreateBetter = () => {
    const [values, setValues] = useState<ValuesProps>(initialValues);
    const [errors, setErrors] = useState<ErrorsProps>(initialValues);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {
        // TODO: Backend call
    };

    //input change handler
    const handleChange = ({name, value}: HandleChangeProps) => {
        setValues({...values, [name]: value});
    };

    //form submission handler
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setErrors(validate());
        setIsSubmitting(true);
    };

    //form validation handler
    // FIXME Em todos
    const validate = () => {
        let errors: ErrorsProps = {...initialValues};
        // Phone numbers, cc, nifs all with 9 numbers

        if (!values.username) {
            errors.username = 'Obrigatório';
        } else if (!REGEX_USERNAME.test(values.username)) {
            errors.username = 'Nome inválido';
        }

        if (!values.password) {
            errors.password = 'Obrigatório';
        } else if (values.password.length < 4) {
            errors.password = 'Password tem de ter mais de 4 carateres';
        }

        if (!values.mail) {
            errors.mail = 'Obrigatório';
        } else if (!REGEX_MAIL.test(values.mail)) {
            errors.mail = 'Mail incorreto';
        }

        if (!values.nif) {
            errors.nif = 'Obrigatório';
        } else if (!REGEX_NUMBERS.test(values.nif)) {
            errors.nif = 'NIF inválido (9 carateres)';
        }

        if (!values.phone) {
            errors.phone = 'Obrigatório';
        } else if (!REGEX_NUMBERS.test(values.phone)) {
            errors.phone = 'Número de telemóvel errado';
        }
        if (!values.numberCC) {
            errors.numberCC = 'Obrigatório';
        } else if (!REGEX_NUMBERS.test(values.numberCC)) {
            errors.numberCC = 'Número de telemóvel errado';
        }
        return errors;
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            submit();
        }
    }, [errors]);

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
                            {/*  FIXME Em todos */}
                            <InputForm
                                type="text"
                                name="Nome de utilizador"
                                id="username"
                                value={values.username}
                                handleChange={handleChange}
                                error={errors.username}
                            />

                            <InputForm
                                type="password"
                                name="Palavra-passe"
                                id="password"
                                value={values.password}
                                handleChange={handleChange}
                                error={errors.password}
                            />
                            <InputForm
                                type="email"
                                name="Email"
                                id="mail"
                                value={values.mail}
                                handleChange={handleChange}
                                error={errors.mail}
                            />
                            <InputForm
                                type="number"
                                name="NIF"
                                id="nif"
                                value={values.nif}
                                handleChange={handleChange}
                                error={errors.nif}
                            />
                            <InputForm
                                type="tel"
                                name="Número telemóvel"
                                id="phone"
                                value={values.phone}
                                handleChange={handleChange}
                                error={errors.phone}
                            />
                            <InputForm
                                type="number"
                                name="Número Cartão de Cidadão"
                                id="numberCC"
                                value={values.numberCC}
                                handleChange={handleChange}
                                error={errors.numberCC}
                            />
                            <div className="flex flex-col items-start self-stretch flex-none order-1 px-20 py-3">
                                <div className=" text-white text-center h-12 p-2 w-24 gap-5 bg-red-600 rounded justify-center ">
                                    {/*  FIXME Em todos */}
                                    <button type="submit">Registar</button>
                                </div>
                            </div>
                            <div className="flex-none order-2  ">
                                <div className="text-center	">
                                    <a
                                        href="/login"
                                        className="flex-none order-2 h text-lg"
                                    >
                                        {/*  FIXME Em todos */}
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
