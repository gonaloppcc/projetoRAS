export const ForgetPasswordContent = () => {
    const RedButton = (props) => {
        return (
            <div className=" items-start text-white	align-baseline	 h-12 p-2 w-24  bg-red-600 text-center	rounded">
                <button type="submit">{props.text}</button>
            </div>
        );
    };

    return (
        <>
            <div className="flex flex-col gap-3 p-5">
                <div className="text-lg  pl-6 pb-2">Esqueci-me da password</div>
                <div>
                    Foi enviado um mail para o endereço #####, com um código de
                    verificação.
                </div>
                <div className=" relative z-0">
                    <input
                        type="text"
                        id="floating_standard"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Code
                    </label>
                    <div className="pt-4">
                        <RedButton text={'Reset'} />{' '}
                    </div>
                </div>
            </div>
        </>
    );
};
