import {Navlink} from '@components/Navlink';
import Link from 'next/link';
import Image from 'next/image';
import {useProfileState} from '@state/useProfileState';
import {PrimaryButton, SecondaryButton} from '@components/Button';
import {useRouter} from 'next/router';
import {Balance} from '@components/Balance';

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
    const {Id, Username, Balance: balance} = useProfileState();

    const router = useRouter();

    const isLoggedIn = Id !== '';

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
                    <div className="flex flex-row items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-LIGHT_GRAY" />
                        <span className="text-WHITE">{Username}</span>
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
