import {Navlink} from '@components/Navlink';
import Image from 'next/image';
import {useProfile} from '@state/useProfile';
import {PrimaryButton, SecondaryButton} from '@components/Button';
import {useRouter} from 'next/router';
import {Balance} from '@components/Balance';
import {useEffect, useState} from 'react';
import {Avatar} from '@components/Avatar';
import {Dropdown} from '@components/Dropdown';
import {Notifications} from '@components/Notifications';
import {UserType} from '@domain/User';

const BETTER_NAVLINKS = [
    {
        name: 'Desporto', // FIXME: Name is in portuguese, needs to be generic
        href: '/', // FIXME: Change this href to the sports page
        isActive: true, // FIXME Change this to true if the current page is the sports page
    },
    /*
    {
        name: 'Promoções', // FIXME: Same as above
        href: '/',
        isActive: true,
    },
     */
    {
        name: 'Transações',
        href: '/',
    },
];

const SPECIALIST_NAVLINKS = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'Editar Jogos',
        href: '/specialist/chooseModality',
        isActive: true,
    },
];

const ADMIN_NAVLINKS = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'Jogos',
        href: '/admin/chooseModality',
        isActive: true,
    },
    {
        name: 'Registar',
        href: '/admin/registerEvent',
    },
];

interface NavBarBodyProps {
    setPaymentModalOpen: (state: boolean) => void;
}

export const NavBarBody = ({setPaymentModalOpen}: NavBarBodyProps) => {
    const {isLoggedIn, type, username, balance, getSession, logout} =
        useProfile();
    const [isNotificationSlideOpen, setIsNotificationSlideOpen] =
        useState(false);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            await getSession();
        })();
    }, [getSession]);

    const loginHandler = async () => {
        await router.push('/login');
    };

    const signupHandler = async () => {
        await router.push('/register');
    };

    const dropdownActions = [
        {
            name: 'Notificações',
            onClick: () => {
                setIsNotificationSlideOpen(true);
            },
        },
        {
            name: 'Logout',
            onClick: logout,
        },
    ];

    if (type === UserType.Better) {
        dropdownActions.unshift({
            name: 'Apostas',
            onClick: async () => {
                await router.push('/better/bets');
            },
        });

        dropdownActions.unshift({
            name: 'Transações',
            onClick: async () => {
                await router.push('/better/transactions');
            },
        });
    }

    const navlinks = [
        ...(type === UserType.Better ? BETTER_NAVLINKS : []),
        ...(type === UserType.Specialist ? SPECIALIST_NAVLINKS : []),
        ...(type === UserType.Admin ? ADMIN_NAVLINKS : []),
    ];

    return (
        <div className="hidden md:flex flex-row justify-between items-center px-8 h-12 gap-3 bg-IMPERIAL_RED">
            <div className="h-full flex flex-row items-center gap-8">
                <Image src={'/logo.png'} alt="Logo" width={50} height={50} />
                <div className="h-full flex flex-row ">
                    {navlinks.map((navlink) => (
                        <Navlink key={navlink.name} {...navlink} />
                    ))}
                </div>
            </div>
            {isLoggedIn && (
                <div className="flex flex-row justify-end items-center p-0 gap-12">
                    {type === UserType.Better && (
                        <Balance
                            setOpen={setPaymentModalOpen}
                            balance={balance}
                        />
                    )}
                    <Dropdown actions={dropdownActions}>
                        <div className="flex flex-row items-center gap-2">
                            <Avatar>{username.at(0)?.toUpperCase()}</Avatar>
                            <span className="text-EERIE_BLACK font-semibold">
                                {username.charAt(0).toUpperCase() +
                                    username.slice(1)}
                            </span>
                        </div>
                    </Dropdown>
                </div>
            )}
            {!isLoggedIn && (
                <div className="flex flex-row justify-end items-center p-0 gap-12">
                    <PrimaryButton onClick={loginHandler}>Login</PrimaryButton>
                    <SecondaryButton onClick={signupHandler}>
                        Sign Up
                    </SecondaryButton>
                </div>
            )}
            {isLoggedIn && (
                <Notifications
                    open={isNotificationSlideOpen}
                    setOpen={setIsNotificationSlideOpen}
                />
            )}
        </div>
    );
};
