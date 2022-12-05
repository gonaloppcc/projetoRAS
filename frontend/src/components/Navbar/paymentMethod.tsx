import {InputForm} from '@components/createBetter/inputForm';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {PrimaryButton} from '@components/Button';

export const PaymentMethod = (props) => {
    const [change, setChange] = useState<number>(0);
    const [changeError, setChangeError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<number>(0);

    const handleChange = (e) => {
        const {value} = e.target;
        if (value === '') {
            setChange(0);
        } else setChange(parseFloat(value));
        setIsSubmitting(false);
    };

    const clickedPaymentMethod = (pos: number) => {
        setPaymentMethod(pos);
    };

    const PaymentCard = (props) => {
        return (
            <button
                onClick={() => clickedPaymentMethod(props.pos)}
                className={`bg-white border-pink-600  w-fit h-fit delay-75 p-5  ${
                    props.pos === paymentMethod ? 'border-4' : 'border-0'
                }`}
            >
                <Image
                    src={props.pathPhoto}
                    width={props.width}
                    height={props.height}
                    alt="Paypal"
                />
            </button>
        );
    };

    const validate = (change) => {
        // TODO: Se for levantar verificar se não é superior ao balanço
        // FIXME
        if (change <= 0) return 'Invalid value';
        else return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(change);
        setChangeError(errors);
        setIsSubmitting(true);
    };

    const submit = () => {
        props.isDepositing
            ? props.changeBalance(props.balance + change)
            : props.changeBalance(props.balance - change);
        props.setMenu(3);
    };

    useEffect(() => {
        console.log('Vai submeter?');
        console.log(changeError === '' && isSubmitting);
        console.log(change);
        if (changeError === '' && isSubmitting) {
            submit();
        }
    }, [isSubmitting]);

    return (
        <div className="p-2">
            {props.isDepositing
                ? // FIXME
                  'Selecione o método de pagamento'
                : 'Selecione o método de levantamento'}

            <div className="flex flex-row gap-5 justify-around	">
                <PaymentCard
                    pathPhoto={'/paypal.png'}
                    width={100}
                    height={100}
                    pos={0}
                />
                <PaymentCard
                    pathPhoto={'/multibanco.png'}
                    width={100}
                    height={100}
                    pos={1}
                />
                <PaymentCard
                    pathPhoto={'/mbway.png'}
                    width={150}
                    height={100}
                    pos={2}
                />
            </div>
            <InputForm
                type="number"
                name="Montante"
                // FIXME
                id="montante"
                value={change}
                handleChange={handleChange}
                error={changeError}
            />
            <div className=" flex flex-row gap-5 justify-around	">
                {/*
                FIXME texto
                */}

                <PrimaryButton onClick={handleSubmit} type="submit">
                    {props.isDepositing
                        ? // FIXME
                          'Depositar Montante'
                        : 'Levantar Montante'}
                </PrimaryButton>
            </div>
        </div>
    );
};
