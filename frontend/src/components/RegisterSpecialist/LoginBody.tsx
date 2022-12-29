import React, {useState} from 'react';
import {HandleChangeProps, InputForm} from '@components/createBetter/inputForm';
import {REGEX_MAIL} from '../../utils/regex';
import {PrimaryButton} from '@components/Button';
import {useProfileState} from '@state/useProfileState';
import {useRouter} from 'next/router';
import Link from 'next/link';

// Receives a function that opens the Modal of "ForgetPassword"
export interface LoginBodyProps {
    setOpen: (value: boolean) => void;
}

interface ValuesProps {
    mail: string;
    password: string;
}

type ErrorsProps = ValuesProps;

const initialValues = {
    mail: '',
    password: '',
};

const initialErrors = {
    mail: '',
    password: '',
};

export const LoginBody = ({setOpen}: LoginBodyProps) => {
    const [values, setValues] = useState<ValuesProps>(initialValues);
    const [errors, setErrors] = useState<ErrorsProps>(initialErrors);

    const router = useRouter();
    const {login} = useProfileState();

    //form submission handler
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        validate();

        if (hasErrors()) return;

        // Do something with the values
        await login(values.mail, values.password);

        await router.push('/');
    };

    const hasErrors = () => {
        return Object.values(errors).some((err) => err !== '');
    };

    //input change handler
    const handleChange = ({name, value}: HandleChangeProps) => {
        setValues({...values, [name]: value});
    };

    //form validation handler
    // FIXME Em todos
    const validate = () => {
        const errors = {
            mail: '',
            password: '',
        };

        if (!values.mail) {
            errors.mail = 'Obrigatório';
        } else if (!REGEX_MAIL.test(values.mail)) {
            errors.mail = 'Mail incorreto';
        }

        if (!values.password) {
            errors.password = 'Obrigatório';
        } else if (values.password.length < 4) {
            errors.password = 'Password tem de ter mais de 4 carateres';
        }

        setErrors(errors);
    };

    return (
        <div className="h-screen w-screen justify-center flex items-center bg-CULTURED">
            <div className="bg-white w-auto flex flex-col items-center px-10 pt-10 h-auto gap-3 relative pb-10">
                <div className="w-24 h-10 not-italic font-normal text-3xl leading-10 text-black flex-none order-none flex-grow-0">
                    Entrar
                </div>
                <div className="flex flex-col items-start flex-none order-1">
                    <div className="flex-none order-none">
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="gap-5"
                        >
                            {/*  FIXME Em todos */}
                            <InputForm
                                type="mail"
                                name="Mail"
                                id="mail"
                                handleChange={handleChange}
                                value={values.mail}
                                error={errors.mail}
                            />

                            <InputForm
                                type="password"
                                name="Palavra-passe"
                                id="password"
                                handleChange={handleChange}
                                value={values.password}
                                error={errors.password}
                            />

                            <div className="flex flex-col center px-20 py-3">
                                {/*  FIXME Em todos */}
                                <PrimaryButton type="submit">
                                    Aceder
                                </PrimaryButton>
                            </div>
                            <div className="flex-none order-2  text-center	">
                                <Link
                                    href="/register"
                                    className="flex-none order-2 h text-lg"
                                >
                                    {/*  FIXME Em todos */}
                                    Não tem conta? Registe-se agora!
                                </Link>
                                <div
                                    onClick={() => setOpen(true)}
                                    className="cursor-pointer"
                                >
                                    Esqueci-me da palavra-passe
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
