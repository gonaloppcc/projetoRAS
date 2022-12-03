import React, {useEffect, useState} from 'react';
import {HandleChangeProps, InputForm} from '@components/createBetter/inputForm';
import {REGEX_MAIL, REGEX_NUMBERS, REGEX_USERNAME} from '../../utils/regex';
import {FormattedMessage, useIntl} from 'react-intl';

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

    const intl = useIntl();

    const featureregister = intl.formatMessage({id: 'loginCard.register'});
    const error4char = intl.formatMessage({id: 'loginCard.error.min4car'});
    const required = intl.formatMessage({id: 'loginCard.Required'});
    const errormail = intl.formatMessage({id: 'loginCard.error.mail'});
    const errorname = intl.formatMessage({id: 'loginCard.error.name'});
    const errornif = intl.formatMessage({id: 'loginCard.error.nif'});
    const errormobile = intl.formatMessage({id: 'loginCard.error.mobile'});
    const errorcc = intl.formatMessage({id: 'loginCard.error.cc'});
    const featurename = intl.formatMessage({id: 'loginCard.usernane'});
    const featurepass = intl.formatMessage({id: 'loginCard.password'});
    const featuremail = intl.formatMessage({id: 'loginCard.mail'});
    const featurenif = intl.formatMessage({id: 'loginCard.nif'});
    const featurephone = intl.formatMessage({id: 'loginCard.phone'});
    const featurecc = intl.formatMessage({id: 'loginCard.cc'});

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
            errors.username = required;
        } else if (!REGEX_USERNAME.test(values.username)) {
            errors.username = errorname;
        }

        if (!values.password) {
            errors.password = required;
        } else if (values.password.length < 4) {
            errors.password = error4char;
        }

        if (!values.mail) {
            errors.mail = required;
        } else if (!REGEX_MAIL.test(values.mail)) {
            errors.mail = errormail;
        }

        if (!values.nif) {
            errors.nif = required;
        } else if (!REGEX_NUMBERS.test(values.nif)) {
            errors.nif = errornif;
        }

        if (!values.phone) {
            errors.phone = required;
        } else if (!REGEX_NUMBERS.test(values.phone)) {
            errors.phone = errormobile;
        }
        if (!values.numberCC) {
            errors.numberCC = required;
        } else if (!REGEX_NUMBERS.test(values.numberCC)) {
            errors.numberCC = errorcc;
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
                    {featureregister}
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
                                htmlFor="text"
                                name = {featurename}
                                id="username"
                                value={values.username}
                                handleChange={handleChange}
                                error={errors.username}
                            />

                            <InputForm
                                htmlFor="password"
                                name={featurepass}
                                id="password"
                                value={values.password}
                                handleChange={handleChange}
                                error={errors.password}
                            />
                            <InputForm
                                htmlFor="email"
                                name={featuremail}
                                id="mail"
                                value={values.mail}
                                handleChange={handleChange}
                                error={errors.mail}
                            />
                            <InputForm
                                htmlFor="number"
                                name={featurenif}
                                id="nif"
                                value={values.nif}
                                handleChange={handleChange}
                                error={errors.nif}
                            />
                            <InputForm
                                htmlFor="tel"
                                name={featurephone}
                                id="phone"
                                value={values.phone}
                                handleChange={handleChange}
                                error={errors.phone}
                            />
                            <InputForm
                                htmlFor="number"
                                name={featurecc}
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
