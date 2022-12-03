import React from 'react';
import {Tab, TabProps} from '@components/Tab';

export interface TabsProps {
    tabs: TabProps[];
    selectedTabIndex: number;
    setSelectedTabIndex: (index: number) => void;
}

export const Tabs = ({
    tabs,
    selectedTabIndex,
    setSelectedTabIndex,
}: TabsProps) => {
    const getTabClickHandler = (index: number) => () => {
        setSelectedTabIndex(index);
    };

    return (
        <div className="w-full flex flex-row justify-start items-center p-0 gap-2 text-left">
            {tabs.map((tab, index) => (
                <Tab
                    key={index}
                    {...tab}
                    isActive={index === selectedTabIndex}
                    onClick={getTabClickHandler(index)}
                />
            ))}
        </div>
    );
};
