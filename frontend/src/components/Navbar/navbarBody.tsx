import {Navlink} from '@components/Navlink';
import Link from 'next/link';
import Image from 'next/image';
import {useProfile} from '@state/useProfile';
import {PrimaryButton, SecondaryButton} from '@components/Button';
import {useRouter} from 'next/router';
import {Balance} from '@components/Balance';
import {useEffect} from 'react';
import {Avatar} from '@components/Avatar';

const navlinks = [
    {
        name: 'Desporto', // FIXME: Name is in portuguese, needs to be generic
        href: '/', // FIXME: Change this href to the sports page
        isActive: false, // FIXME Change this to true if the current page is the sports page
    },
    {
        name: 'Promoções', // FIXME: Same as above
        href: '/',
        isActive: true,
    },
];

interface NavBarBodyProps {
    setOpen: (state: boolean) => void;
}

export const NavBarBody = ({setOpen}: NavBarBodyProps) => {
    const {isLoggedIn, id, username, balance, getSession} = useProfile();

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
                    <Balance setOpen={setOpen} balance={balance} />

                    <Link href="/better/bets" className="text-WHITE">
                        {'Apostas' /* FIXME Hardcoded for now */}
                    </Link>
                    <Link href="/better/Operations" className="text-WHITE">
                        {'Transações' /* FIXME Hardcoded for now */}
                    </Link>
                    <div className="flex flex-row items-center gap-2">
                        <Avatar>{username.at(0)?.toUpperCase()}</Avatar>
                        {/*<div className="w-8 h-8 rounded-full bg-LIGHT_GRAY" />*/}
                        <span className="text-EERIE_BLACK font-semibold">
                            {username.charAt(0).toUpperCase() +
                                username.slice(1)}
                        </span>
                    </div>
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
        </div>
    );
};
