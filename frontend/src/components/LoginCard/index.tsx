import React, {useEffect, useState} from 'react';
import {InputForm} from '../createBetter/inputForm';
import {Modal} from '../Modal/index';
import {REGEX_MAIL} from '../../utils/regex';
import emailjs from '@emailjs/browser';

import {useRef} from 'react';
import {ForgetPassword} from './forgetPassword';

export const LoginCard = () => {
    const intialValues = {email: '', password: '', emailRecover: ''};

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
        if (!values.emailRecover) {
            errors.emailRecover = 'Cannot be blank';
        } else if (!REGEX_MAIL.test(values.emailRecover)) {
            errors.emailRecover = 'Invalid email format';
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

    return (
        <div>
            {open && (
                <Modal
                    open={open}
                    setOpen={setOpen}
                    content={<ForgetPassword />}
                />
            )}

            <LoginBody />
        </div>
    );
};
