import React, {useEffect, useState, useTransition} from 'react';
import {InputForm} from './../createBetter/inputForm';
import {REGEX_MAIL, REGEX_NUMBERS, REGEX_USERNAME} from '../../utils/regex';
import {ForgetPasswordContent} from './forgetPassword';

import {useRouter} from 'next/router';
import {FormattedMessage, useIntl} from 'react-intl';

const intialValues = {
    mail: '',
    password: '',
};

export const LoginCard = () => {
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const intl = useIntl();

    const featurepass = intl.formatMessage({id: 'loginCard.password'});
    const featuremail = intl.formatMessage({id: 'loginCard.mail'});
    const featurelogin = intl.formatMessage({id: 'loginCard.login'});
    const buttonlogin = intl.formatMessage({id: 'loginCard.button.login'});

    const title = intl.formatMessage({id: 'coisa'});
    const btnForgetPassword = intl.formatMessage({
        id: 'loginCard.ForgetPassword',
    });

    const error4char = intl.formatMessage({
        id: 'loginCard.errorpassword',
    });

    const required = intl.formatMessage({
        id: 'loginCard.Required',
    });

    const erroremail = intl.formatMessage({
        id: 'loginCard.error.mail',
    });

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
    // FIXME Em todos
    const validate = (values) => {
        let errors = {};
        // Phone numbers, cc, nifs all with 9 numbers

        if (!values.password) {
            errors.password = required;
        } else if (values.password.length < 4) {
            errors.password = error4char;
        }

        if (!values.mail) {
            errors.mail = required;
        } else if (!REGEX_MAIL.test(values.mail)) {
            errors.mail = erroremail;
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
                    {title}
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
                                htmlFor="email"
                                name={featuremail}
                                id="mail"
                                value={formValues.mail}
                                handleChange={handleChange}
                                error={formErrors.mail}
                            />
                            <InputForm
                                htmlFor="password"
                                name={featurepass}
                                id="password"
                                value={formValues.password}
                                handleChange={handleChange}
                                error={formErrors.password}
                            />

                            <div className="flex flex-col items-start self-stretch flex-none order-1 px-20 justify-center pt-1 pb-10">
                                <div className=" text-white text-center h-12 p-2 w-24 gap-5 bg-red-600 rounded justify-center ">
                                    {/*  FIXME Em todos */}
                                    <button type="submit">{buttonlogin}</button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 text-center  ">
                                <a
                                    href="/register"
                                    className="flex-none order-2 h text-lg"
                                >
                                    {/*  FIXME Em todos */}
                                    {featurelogin}
                                </a>
                                <div className="flex-none order-2 h text-lg">
                                    {/*  FIXME Adicionar o modal aqui */}
                                    {btnForgetPassword}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
