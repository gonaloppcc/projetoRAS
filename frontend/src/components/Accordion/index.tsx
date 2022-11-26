import React, {useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import classNames from 'classnames';

export interface AccordionProps {
    children: React.ReactNode;
}

export const Accordion = ({children}: AccordionProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full h-min">
            <button
                onClick={toggle}
                className={classNames({
                    'flex items-center justify-between w-full px-4 py-3 font-medium text-left text-RICH_BLACK bg-WHITE':
                        true,
                    'border-b-0': isOpen,
                })}
            >
                <span className="font-semibold">Em Curso</span>
                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </button>
            {isOpen && children}
        </div>
    );
};
