import React, {useEffect, useState} from 'react';
import {InputForm} from './inputForm';
import {REGEX_MAIL, REGEX_NUMBERS, REGEX_USERNAME} from '../../utils/regex';
import {FormattedMessage, useIntl} from 'react-intl';
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

    const intl = useIntl();

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
                            {/*  FIXME Em todos */}
                            <InputForm
                                htmlFor="text"
                                name = {featurename}
                                id="username"
                                value={formValues.username}
                                handleChange={handleChange}
                                error={formErrors.username}
                            />

                            <InputForm
                                htmlFor="password"
                                name={featurepass}
                                id="password"
                                value={formValues.password}
                                handleChange={handleChange}
                                error={formErrors.password}
                            />
                            <InputForm
                                htmlFor="email"
                                name={featuremail}
                                id="mail"
                                value={formValues.mail}
                                handleChange={handleChange}
                                error={formErrors.mail}
                            />
                            <InputForm
                                htmlFor="number"
                                name={featurenif}
                                id="nif"
                                value={formValues.nif}
                                handleChange={handleChange}
                                error={formErrors.nif}
                            />
                            <InputForm
                                htmlFor="tel"
                                name={featurephone}
                                id="phone"
                                value={formValues.phone}
                                handleChange={handleChange}
                                error={formErrors.phone}
                            />
                            <InputForm
                                htmlFor="number"
                                name={featurecc}
                                id="numberCC"
                                value={formValues.numberCC}
                                handleChange={handleChange}
                                error={formErrors.numberCC}
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
