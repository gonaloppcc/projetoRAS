import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import OutputIcon from '@mui/icons-material/Output';

interface DepositOrWithdrawProps {
    setMenu: (menu: number) => void;
    setDepositing: (depositing: boolean) => void;
}

export const DepositOrWithdraw = ({
    setMenu,
    setDepositing,
}: DepositOrWithdrawProps) => {
    const clicked = (deposit: boolean) => {
        setMenu(1);
        setDepositing(deposit);
    };

    return (
        <div className="flex flex-row justify-around gap-2">
            <div
                onClick={() => clicked(true)}
                className="p-5 w-fit h-fit flex flex-col gap-2 cursor-pointer"
            >
                <ExitToAppIcon sx={{fontSize: 70}} />
                <button>Depositar</button>
            </div>
            <div
                onClick={() => clicked(false)}
                className="p-5 w-fit h-fit flex flex-col gap-2 cursor-pointer"
            >
                <OutputIcon sx={{fontSize: 70}} />
                <button>Levantar</button>
            </div>
        </div>
    );
};
