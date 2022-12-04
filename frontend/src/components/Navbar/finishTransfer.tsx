import {FormattedMessage, useIntl} from 'react-intl';
export const FinishTransfer = (props) => {
    const intl = useIntl();
    const featureTransfer = intl.formatMessage({id: 'Navbar.finishTransfer'});
    return (
        // FIXME
        //<div className="bg-white w-fit text-xl text-center px-10 py-10  ">
        <div className="bg-white flex items-center font-semibold justify-center px-5 py-10 ">
            {featureTransfer}
        </div>
    );
};
