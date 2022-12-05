import {Navlink} from '@components/Navlink';
import Link from 'next/link';
import Image from 'next/image';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import {useProfileState} from '@state/useProfileState';
import {PrimaryButton, SecondaryButton} from '@components/Button';
import {useRouter} from 'next/router';

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
const Balance = ({
    balance,
    setOpen,
}: {
    balance: number;
    setOpen: (state: boolean) => void;
}) => {
    return (
        <button
            className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={() => setOpen(true)}
        >
            <svg
                className="w-6 h-6 mr-2 "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <AddCircleOutlinedIcon
                    style={{color: 'white'}}
                    sx={{fontSize: 70}}
                />
            </svg>
            <span>{balance} €</span>
        </button>
    );
};

export const NavBarBody = (props) => {
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
                <Image src={'/logo.png'} width={50} height={50} />
                <div className="h-full flex flex-row ">
                    {navlinks.map((navlink) => (
                        <Navlink key={navlink.name} {...navlink} />
                    ))}
                </div>
            </div>
            {isLoggedIn && (
                <div className="flex flex-row justify-end items-center p-0 gap-12">
                    <Balance setOpen={props.setOpen} balance={balance} />

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
