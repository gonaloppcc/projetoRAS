import React, {ButtonHTMLAttributes} from 'react';

interface ButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const PrimaryButton = ({
    children,
    disabled,
    onClick,
    type,
}: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            className="bg-IMPERIAL_RED hover:bg-CARNELIAN py-2 px-4 disabled:opacity-50 disable:cursor-not-allowed text-WHITE rounded font-semibold"
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

export const SecondaryButton = ({children, disabled}: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            className="bg-WHITE hover:bg-CULTURED disabled:opacity-50 disable:cursor-not-allowed py-2 px-4 border border-IMPERIAL_RED text-IMPERIAL_RED rounded font-semibold"
        >
            {children}
        </button>
    );
};

export const TertiaryButton = ({children, disabled}: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            className="bg-white hover:bg-gray-100 disabled:opacity-50 disable:cursor-not-allowed text-EERIE_BLACK font-semibold py-2 px-4 border border-RICH_BLACK rounded shadow"
        >
            {children}
        </button>
    );
};

export const FullWidthButton = ({children, disabled}: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            className="w-full bg-IMPERIAL_RED hover:bg-CARNELIAN disabled:opacity-50 disable:cursor-not-allowed text-WHITE font-semibold py-2 px-4 rounded"
        >
            {children}
        </button>
    );
};
