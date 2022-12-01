import React, {useRef, useState} from 'react';

export const InsertCodeBody = () => {
    const [code, setCode] = useState<string>('');
    const changeCode = (e) => {
        const {name, value} = e.target;
        setCode(value);
    };
    const codeInserted = () => {
        console.log('Code inserted');
        console.log(code);
        console.log('Is equal?');
        console.log(parseInt(code) === code_generated);
    };

    return <div>Página de inserir código</div>;
};
