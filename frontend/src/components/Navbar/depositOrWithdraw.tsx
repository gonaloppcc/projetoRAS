import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import OutputIcon from '@mui/icons-material/Output';

// @ts-ignore
export const DepositOrWithdraw = (props) => {
    const clicked = (deposit: boolean) => {
        props.setMenu(1);
        deposit ? props.setDepositing(true) : props.setDepositing(false);
    };

    const DepositCard = () => {
        return (
            <div
                onClick={() => clicked(true)}
                className="p-5 w-fit h-fit flex flex-col gap-2 cursor-pointer"
            >
                <ExitToAppIcon sx={{fontSize: 70}} />
                <button>Depositar</button>
            </div>
        );
    };
    const WithdrawCard = () => {
        return (
            <div
                onClick={() => clicked(false)}
                className="p-5 w-fit h-fit flex flex-col gap-2 cursor-pointer"
            >
                <OutputIcon sx={{fontSize: 70}} />
                <button>Levantar</button>
            </div>
        );
    };
    return (
        <div className="flex flex-row justify-around	 gap-2 ">
            <DepositCard />
            <WithdrawCard />
        </div>
    );
};
