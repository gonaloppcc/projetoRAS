import {HandleChangeProps, InputForm} from '@components/createBetter/inputForm';
import React, {useCallback, useEffect, useState} from 'react';
import Image from 'next/image';
import {PrimaryButton} from '@components/Button';
import {useProfile} from '@state/useProfile';
import {useMutation} from '@tanstack/react-query';
import toast from 'react-hot-toast';

export interface PaymentMethodProps {
    isDepositing: boolean;
    setMenu: (menuIndex: number) => void;
}

export const PaymentMethod = ({isDepositing, setMenu}: PaymentMethodProps) => {
    const [amount, setAmount] = useState<number>(0);
    const [changeError, setChangeError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<number>(0);

    const {deposit, withdraw} = useProfile();

    const makeTransactionMutation = useMutation({
        mutationFn: isDepositing ? deposit : withdraw,
        onSuccess: async () => {
            toast.success('Transação realizada com sucesso!');
        },
    });

    const submit = useCallback(() => {
        makeTransactionMutation.mutate(amount);
        setMenu(3);
    }, [amount, makeTransactionMutation, setMenu]);

    const handleChange = ({value}: HandleChangeProps) => {
        if (value === '') {
            setAmount(0);
        } else setAmount(parseFloat(value));
        setIsSubmitting(false);
    };

    const clickedPaymentMethod = (pos: number) => {
        setPaymentMethod(pos);
    };

    const PaymentCard = ({
        pos,
        pathPhoto,
        width,
        height,
    }: {
        pos: number;
        pathPhoto: string;
        width: number;
        height: number;
    }) => {
        return (
            <button
                onClick={() => clickedPaymentMethod(pos)}
                className={`bg-white border-pink-600  w-fit h-fit delay-75 p-5  ${
                    pos === paymentMethod ? 'border-4' : 'border-0'
                }`}
            >
                <Image
                    src={pathPhoto}
                    width={width}
                    height={height}
                    alt="Paypal"
                />
            </button>
        );
    };

    const validate = (change: number) => {
        // TODO: Se for levantar verificar se não é superior ao balanço
        // FIXME
        if (change <= 0) return 'Invalid value';
        else return '';
    };

    const submitHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        const errors = validate(amount);
        setChangeError(errors);
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (changeError === '' && isSubmitting) {
            submit();
        }
    }, [changeError, isSubmitting, submit]);

    return (
        <div className="p-2">
            {isDepositing
                ? // FIXME
                  'Selecione o método de pagamento'
                : 'Selecione o método de levantamento'}

            <div className="flex flex-row gap-5 justify-around	">
                <PaymentCard
                    pathPhoto="/paypal.png"
                    width={100}
                    height={100}
                    pos={0}
                />
                <PaymentCard
                    pathPhoto="/multibanco.png"
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
                value={String(amount)}
                handleChange={handleChange}
                error={changeError}
            />
            <div className=" flex flex-row gap-5 justify-around	">
                {/*
                FIXME texto
                */}

                <PrimaryButton onClick={submitHandler} type="submit">
                    {isDepositing
                        ? // FIXME
                          'Depositar Montante'
                        : 'Levantar Montante'}
                </PrimaryButton>
            </div>
        </div>
    );
};
