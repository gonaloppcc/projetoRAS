import React, {useState} from 'react';
import {HandleChangeProps, InputForm} from '@components/createBetter/inputForm';
import {REGEX_MAIL} from '../../utils/regex';
import {PrimaryButton} from '@components/Button';
import {useProfile} from '@state/useProfile';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {useMutation} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {AxiosError} from 'axios';

// Receives a function that opens the Modal of "ForgetPassword"
export interface LoginBodyProps {
    setOpen: (value: boolean) => void;
}

interface ValuesProps {
    mail: string;
    password: string;
}

interface ErrorsProps extends ValuesProps {
    submission: string;
}

const initialValues = {
    mail: '',
    password: '',
};

const initialErrors = {
    mail: '',
    password: '',
    submission: '',
};

export const LoginBody = ({setOpen}: LoginBodyProps) => {
    const [values, setValues] = useState<ValuesProps>(initialValues);
    const [errors, setErrors] = useState<ErrorsProps>(initialErrors);

    const router = useRouter();
    const {login} = useProfile();
    const loginMutation = useMutation({
        mutationFn: () => login(values.mail, values.password),
        onSuccess: async () => {
            toast.success('Login realizado com sucesso!');

            await router.push('/');
        },
        onError: async (error: AxiosError) => {
            let submissionError: string;

            if (error?.response?.status === 401) {
                submissionError = 'Mail ou palavra-passe inválidos';
            } else {
                submissionError =
                    'Ocorreu um erro inesperado, tente novamente mais tarde';
            }

            setErrors({
                ...initialErrors,
                submission: submissionError,
            });
        },
    });

    //form submission handler
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        validate();

        if (hasErrors()) return;

        loginMutation.mutate();
    };

    const hasErrors = () => {
        const hasErrors = Object.values(errors).some((err) => err !== '');

        console.log('hasErrors', hasErrors);
    };

    //input change handler
    const handleChange = ({name, value}: HandleChangeProps) => {
        setValues({...values, [name]: value});
    };

    //form validation handler
    // FIXME Em todos
    const validate = () => {
        const validateErrors = {
            mail: '',
            password: '',
            submission: '',
        };

        if (!values.mail) {
            validateErrors.mail = 'Obrigatório';
        } else if (!REGEX_MAIL.test(values.mail)) {
            validateErrors.mail = 'Mail incorreto';
        }

        if (!values.password) {
            validateErrors.password = 'Obrigatório';
        } else if (values.password.length < 4) {
            validateErrors.password = 'Password tem de ter mais de 4 carateres';
        }

        setErrors(validateErrors);
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
                            {errors.submission && (
                                <div className="text-red-500">
                                    {errors.submission}
                                </div>
                            )}

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
