import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import OutputIcon from '@mui/icons-material/Output';
import {FormattedMessage, useIntl} from 'react-intl';

// @ts-ignore
export const DepositOrWithdraw = (props) => {
    const clicked = (deposit: boolean) => {
        props.setMenu(1);
        deposit ? props.setDepositing(true) : props.setDepositing(false);
    };

    const DepositCard = () => {
        const intl = useIntl();
        const featureDeposit = intl.formatMessage({id: 'MoneyOperation.Deposit'});
        return (
            <div
                onClick={() => clicked(true)}
                className="p-5 w-fit h-fit flex flex-col gap-2 cursor-pointer"
            >
                <ExitToAppIcon sx={{fontSize: 70}} />
                <button>{featureDeposit}</button>
            </div>
        );
    };
    const WithdrawCard = () => {
        const intl = useIntl();
        const featureWithdraw = intl.formatMessage({id: 'MoneyOperation.Withdraw'});
        return (
            <div
                onClick={() => clicked(false)}
                className="p-5 w-fit h-fit flex flex-col gap-2 cursor-pointer"
            >
                <OutputIcon sx={{fontSize: 70}} />
                <button>{featureWithdraw}</button>
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
