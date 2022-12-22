import React, {useState} from 'react';
import {HandleChangeProps, InputForm} from '../createBetter/inputForm';
import {ScrollModalities} from './scrollModalities';
import {REGEX_MAIL, REGEX_USERNAME} from 'utils/regex';
import {PrimaryButton} from '@components/Button';
import {Specialist} from '@domain/User';
import {postSpecialist} from '../../services/backend/user';

export interface FormErrors {
    username: string;
    mail: string;
    password: string;
    modalities: string;
}

const initialValueFormErrors: FormErrors = {
    username: '',
    mail: '',
    password: '',
    modalities: '',
};

//export interface
export interface RegisterSpecialistProps {
    modalities: string[];
}

const intialValues = {
    mail: '',
    username: '',
    password: '',
};

interface valuesProps {
    mail: string;
    username: string;
    password: string;
}

export const RegisterSpecialist = ({modalities}: RegisterSpecialistProps) => {
    const [formValues, setFormValues] = useState<valuesProps>(intialValues);
    const [modalitiesSelected, setModalitiesSelected] = useState<string[]>([]);
    const [formErrors, setFormErrors] = useState(initialValueFormErrors);

    const submit = async () => {
        console.log('Submissão feita');
        console.log(formValues);
        console.log(modalitiesSelected);
        const specialist: Specialist = {
            Email: formValues.mail,
            Username: formValues.username,
            Password: formValues.password,
            // TODO: Falta este, mas tenho de ter o get
            Specialties: [],
        };
        await postSpecialist(specialist);
        console.log('Conseguiu?');
    };

    const changeModalities = (team: string, selected: boolean) => {
        if (selected) {
            setModalitiesSelected([...modalitiesSelected, team]);
        } else {
            setModalitiesSelected(modalitiesSelected.filter((t) => t !== team));
        }
    };

    //input change handler
    const handleChange = ({name, value}: HandleChangeProps) => {
        console.log({name, value});
        setFormValues({...formValues, [name]: value});
    };

    const hasErrors = () => {
        return Object.values(formErrors).some((err) => err !== '');
    };
    //form submission handler
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        console.log('handle submit');
        console.log(formErrors);
        validate();
        e.preventDefault();
        if (!hasErrors()) {
            submit();
        }
    };

    //form validation handler
    // FIXME Em todos
    const validate = () => {
        let errors: FormErrors = {...initialValueFormErrors};
        // FIXME todos
        // E regex

        if (!formValues.username) {
            errors.username = 'Obrigatório';
        } else if (!REGEX_USERNAME.test(formValues.username)) {
            errors.username = 'Formato inválido';
        }

        if (!formValues.password) {
            errors.password = 'Obrigatório';
        } else if (formValues.password.length < 4) {
            errors.password = 'Password tem de ter mais de 4 carateres';
        }

        if (!formValues.mail) {
            errors.mail = 'Obrigatório';
        } else if (!REGEX_MAIL.test(formValues.mail)) {
            errors.mail = 'Mail incorreto';
        }

        if (modalitiesSelected.length === 0) {
            errors.modalities = 'Escolha um.';
        }
        setFormErrors(errors);
    };

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
                                type="email"
                                name="Email"
                                id="mail"
                                value={formValues.mail}
                                handleChange={handleChange}
                                error={formErrors.mail}
                            />
                            <InputForm
                                type="text"
                                name="Username"
                                id="username"
                                value={formValues.username}
                                handleChange={handleChange}
                                error={formErrors.username}
                            />
                            <InputForm
                                type="password"
                                name="Palavra-passe"
                                id="password"
                                value={formValues.password}
                                handleChange={handleChange}
                                error={formErrors.password}
                            />
                            <ScrollModalities
                                key="Scroll_Mod"
                                changeModality={changeModalities}
                                modalities={modalities}
                                maybeError={formErrors.modalities}
                            />

                            <div className="flex flex-col items-start self-stretch flex-none order-1 h-12 px-20 justify-center   pt-10">
                                <PrimaryButton type="submit">
                                    Registar
                                    {/* FIXME Todos */}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
