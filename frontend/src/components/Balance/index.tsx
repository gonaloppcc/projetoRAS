import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

export interface BalanceProps {
    balance: number;
    setOpen: (state: boolean) => void;
}

export const Balance = ({balance, setOpen}: BalanceProps) => {
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
