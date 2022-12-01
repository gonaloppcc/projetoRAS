import {ClassNames} from '@emotion/react';
import React, {useEffect, useState} from 'react';
import {InputForm} from '../createBetter/inputForm';

export const DeleteAccount = () => {
    const initialValue = {username: ''};

    const [formValue, setFormValue] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {
        console.log('Submissão feita');
        console.log(formValue);
    };

    //input change handler
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
    };

    //form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValue));
        setIsSubmitting(true);
    };

    //form validation handler
    const validate = (value) => {
        let errors = {};

        if (!value.username) {
            // FIXME
            errors.username = 'Cannot be blank';
        }

        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit();
        }
    }, [formErrors]);

    const deleteAccount = () => {
        console.log('Remove account: ', formValue.username);
    };

    return (
        <div className="h-screen w-screen justify-center flex items-top bg-CULTURED">
            <div className="bg-white w-3/4  flex flex-col items-center px-10 pt-10  mt-20 h-fit  ">
                <div className=" not-italic font-normal lack flex-none order-none flex-grow-0">
                    Selecione o nome do utilizador que pretende remover
                </div>
                <div className="flex flex-col items-start flex-none order-1 pt-5  gap-12 ">
                    <form onSubmit={handleSubmit} noValidate className=" gap-5">
                        <InputForm
                            // FIXME
                            htmlFor="text"
                            name="Nome de utilizador"
                            id="username"
                            value={formValue.username}
                            handleChange={handleChange}
                            error={formErrors.username}
                        />

                        <div className="flex flex-col pt-5 items-start self-stretch flex-none order-1 h-12 px-20 justify-center pt-10 pb-20 ">
                            <div className="flex flex-row items-start order-none h-12 p-2 w-fit bg-red-600  text-white text-xl rounded justify-center ">
                                <button type="submit" onClick={deleteAccount}>
                                    {/* FIXME */}
                                    Remover Conta
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
