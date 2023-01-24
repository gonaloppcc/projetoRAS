import React, {useState} from 'react';
import {HandleChangeProps, InputForm} from '@components/createBetter/inputForm';
import {REGEX_MAIL, REGEX_NUMBERS, REGEX_USERNAME} from '../../utils/regex';
import Link from 'next/link';
import {PrimaryButton} from '@components/Button';
import {useMutation} from '@tanstack/react-query';
import {registerBetter} from '../../services/backend/user';
import {useRouter} from 'next/router';
import {useProfile} from '@state/useProfile';
import {AxiosError} from 'axios';
import toast from 'react-hot-toast';

interface ValuesProps {
    password: string;
    email: string;
    cellphone: string;
    cc: string;
    nif: string;
    username: string;
}

interface ErrorsProps extends ValuesProps {
    submission: string;
}

const initialValues: ValuesProps = {
    username: '',
    email: '',
    password: '',
    nif: '',
    cellphone: '',
    cc: '',
};

const initialErrors: ErrorsProps = {
    ...initialValues,
    submission: '',
};

export const CreateBetter = () => {
    const [values, setValues] = useState<ValuesProps>(initialValues);
    const [errors, setErrors] = useState<ErrorsProps>(initialErrors);
    const router = useRouter();
    const {login} = useProfile();

    const registerMutation = useMutation({
        mutationFn: async () => {
            await registerBetter(
                values.username,
                values.email,
                values.password,
                values.nif,
                values.cellphone,
                values.cc
            );
        },
        onSuccess: async () => {
            toast.success('Registado com sucesso!');
            await login(values.email, values.password);
            await router.push('/');
        },
        onError: (error) => {
            setErrors({
                ...initialErrors,
                submission: (error as AxiosError).message,
            });
        },
    });

    const hasErrors = () => {
        return Object.values(errors).some((err) => err !== '');
    };

    const submit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        validate();
        if (!hasErrors()) {
            registerMutation.mutate();
        }
    };

    const handleChange = ({name, value}: HandleChangeProps) => {
        setValues({...values, [name]: value});
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        validate();
    };

    const validate = () => {
        let errors: ErrorsProps = {
            username: '',
            email: '',
            password: '',
            nif: '',
            cellphone: '',
            cc: '',
            submission: '',
        };

        // FIXME: Add translations
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

        if (!values.email) {
            errors.email = 'Obrigatório';
        } else if (!REGEX_MAIL.test(values.email)) {
            errors.email = 'Mail incorreto';
        }

        if (!values.nif) {
            errors.nif = 'Obrigatório';
        } else if (!REGEX_NUMBERS.test(values.nif)) {
            errors.nif = 'NIF inválido (9 carateres)';
        }

        if (!values.cellphone) {
            errors.cellphone = 'Obrigatório';
        } else if (!REGEX_NUMBERS.test(values.cellphone)) {
            errors.cellphone = 'Número de telemóvel errado';
        }
        if (!values.cc) {
            errors.cc = 'Obrigatório';
        } else if (!REGEX_NUMBERS.test(values.cc)) {
            errors.cc = 'Número de telemóvel errado';
        }

        setErrors(errors);
    };

    return (
        <div className="h-screen w-screen justify-center flex items-center bg-CULTURED">
            <div className="bg-white w-auto flex flex-col items-center px-10 pt-10 pb-10 h-auto gap-10 relative ">
                <div className="w-24 h-10  not-italic font-normal text-3xl leading-10 text-black flex-none order-none flex-grow-0">
                    Registo
                </div>
                <div className="flex flex-col items-start flex-none order-1">
                    <div className="flex-none order-none">
                        <form onSubmit={submit} noValidate className="gap-5">
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
                                id="email"
                                value={values.email}
                                handleChange={handleChange}
                                error={errors.email}
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
                                id="cellphone"
                                value={values.cellphone}
                                handleChange={handleChange}
                                error={errors.cellphone}
                            />
                            <InputForm
                                type="number"
                                name="Número Cartão de Cidadão"
                                id="cc"
                                value={values.cc}
                                handleChange={handleChange}
                                error={errors.cc}
                            />
                            {errors.submission && (
                                <div className="text-red-500">
                                    {errors.submission}
                                </div>
                            )}

                            <div className="flex flex-col items-start self-stretch flex-none order-1 px-20 py-3">
                                <PrimaryButton
                                    disabled={registerMutation.isLoading}
                                    type="submit"
                                >
                                    Registar
                                </PrimaryButton>
                            </div>
                            <div className="flex-none order-2  ">
                                <div className="text-center	">
                                    <Link
                                        href="/login"
                                        className="flex-none order-2 h text-lg"
                                    >
                                        {/*  FIXME Em todos */}
                                        Já tem conta? Faça login!
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
