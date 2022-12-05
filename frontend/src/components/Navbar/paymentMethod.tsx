import {InputForm} from '@components/createBetter/inputForm';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {FormattedMessage, useIntl} from 'react-intl';

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
        var errors = validate(change);
        setChangeError(errors);
        setIsSubmitting(true);
    };

    const submit = () => {
        props.isDepositing
            ? props.changeBalance(props.balance + change)
            : props.changeBalance(props.balance - change);
        console.log('O valor novo é:');
        console.log(props.balance);
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

    const RedButton = (props) => {
        return (
            <div className=" items-start text-white	align-baseline	 w-fit h-12 p-2 w-24  bg-red-600 text-center	rounded">
                <button onClick={props.onClick} type="submit">
                    {props.text}
                </button>
            </div>
        );
    };
    const intl = useIntl();
    const featureDeposit = intl.formatMessage({id: 'Navbar.finishDeposit'});
    const featureWithdraw = intl.formatMessage({id: 'Navbar.finishWithdraw'});
    const featureStake = intl.formatMessage({id: 'Navbar.finishMontante'});
    const featuredeposit = intl.formatMessage({id: 'Navbar.finishMoney'});
    return (
        <div className="p-2">
            {props.isDepositing
                ? // FIXME
                  featureDeposit
                : featureWithdraw}

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
                name={featureStake}
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
                <RedButton onClick={handleSubmit} text={featuredeposit} />
            </div>
        </div>
    );
};
