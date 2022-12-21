export interface finishTransferProps {
    setOpen: (open: boolean) => void;
    isDepositing: boolean;
}

export const FinishTransfer = ({
    setOpen,
    isDepositing,
}: finishTransferProps) => {
    return (
        // FIXME
        //<div className="bg-white w-fit text-xl text-center px-10 py-10  ">
        <div className="bg-white flex items-center font-semibold justify-center px-5 py-10 ">
            Transferência efetuada com sucesso!
        </div>
    );
};
