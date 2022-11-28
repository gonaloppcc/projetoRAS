import {InputForm} from '@components/createBetter/inputForm';
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
export const PaymentMethod = (props) => {
    const [change, setChange] = useState<number>(0);
    const [changeError, setChangeError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<number>(0);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setChange(parseFloat(value));
    };

    const clickedButton = (pos: int) => {
        setPaymentMethod(pos);
    };

    const PaymentCard = (props) => {
        return (
            <button
                onClick={() => clickedButton(props.pos)}
                className={`bg-white border-pink-600  w-fit h-fit delay-75 ${
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
    const validate = (change: int) => {
        if (change <= 0) return 'Invalid value';
        else return '';
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setChangeError(validate(change));
        setIsSubmitting(true);
    };
    const submit = () => {
        console.log('Submissão feita');
        props.isDepositing
            ? props.changeBalance(props.balance + change)
            : props.changeBalance(props.balance - change);
        props.setMenu(3);
    };
    useEffect(() => {
        if (changeError === '' && isSubmitting) {
            submit();
        }
    }, [changeError]);

    const RedButton = (props) => {
        return (
            <div className=" items-start text-white	align-baseline	 w-fit h-12 p-2 w-24  bg-red-600 text-center	rounded">
                <button onClick={props.onClick} type="submit">
                    {props.text}
                </button>
            </div>
        );
    };

    return (
        <div className="p-2">
            {props.isDepositing
                ? 'Selecione o método de pagamento'
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
                htmlFor="number"
                name="Montante"
                id="montante"
                value={change}
                handleChange={handleChange}
                error={changeError}
            />
            <div className=" flex flex-row gap-5 justify-around	">
                <RedButton onClick={handleSubmit} text="Depositar dinheiro" />
            </div>
        </div>
    );
};
