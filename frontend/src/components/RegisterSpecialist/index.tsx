import {ClassNames} from '@emotion/react';
import {ErrorSharp} from '@mui/icons-material';
import React, {useEffect, useState} from 'react';
import {InputForm} from '../createBetter/inputForm';
import {ScrollModalities} from './scrollModalities';

export const RegisterSpecialist = (props) => {
    /*
    Get Sports available
    */

    // Depois passa para estruturas com nomes e ícones, em cada posição da lista
    const [modalities, setModalities] = useState([]);
    const changeModalities = (modality, value) => {
        console.log('Change state');

        value
            ? setModalities((current) => [...current, modality])
            : setModalities((current) =>
                  current.filter((element) => {
                      return element !== modality;
                  })
              );
    };
    /*
    Form Part
    */
    const intialValues = {
        email: '',
        username: '',
        password: '',
    };

    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {
        console.log('Submissão feita');
        console.log(formValues);
        console.log(modalities);
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
        // FIXME todos
        // E regex
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.email) {
            errors.email = 'Cannot be blank';
        } else if (!regex.test(values.email)) {
            errors.email = 'Invalid email format';
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

        if (!values.username) {
            errors.username = 'Cannot be blank';
        }
        if (modalities.length === 0) {
            errors.modalities = 'Choose at least one.';
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
            <div className="bg-white w-1/2 flex flex-col items-center px-10 pt-10 pb-20 h-auto  relative ">
                <div className="w-24 h-10  not-italic font-normal text-4xl leading-10 text-black flex-none order-none  flex-grow-0">
                    {/* FIXME */}
                    Registo
                </div>
                <div className="flex flex-col items-start flex-none order-1 pt-5  gap-12 ">
                    <div className="flex-none order-none  ">
                        {/* FIXME Todos */}
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="gap-5"
                        >
                            {/*  FIXME Em todos */}

                            <InputForm
                                htmlFor="email"
                                name="Email"
                                id="mail"
                                value={formValues.mail}
                                handleChange={handleChange}
                                error={formErrors.mail}
                            />
                            <InputForm
                                htmlFor="text"
                                name="Username"
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
                            <ScrollModalities
                                key="Scroll_Mod"
                                changeModality={changeModalities}
                                modalities={props.modalities}
                                maybeError={formErrors.modalities}
                            />

                            <div className="flex flex-col items-start self-stretch flex-none order-1 h-12 px-20 justify-center   pt-10">
                                <div className="text-white h-12 p-2 w-24 gap-5 bg-red-600 rounded text-center	 ">
                                    <button type="submit">
                                        {/* FIXME Todos */}
                                        Registar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
