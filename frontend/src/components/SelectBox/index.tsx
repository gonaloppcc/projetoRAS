import React from 'react';
import {SearchBox} from '@components/RegisterEvent/searchBox';
import {Table} from '@components/RegisterEvent/table';

export interface SelectBoxProps {
    title: string;
}

export const SelectBox = ({title}: SelectBoxProps) => {
    return (
        <div>
            <SearchBox></SearchBox>
            <Table
                title={title}
                content={}
                changeValueHandler={}
                error={}
            ></Table>
        </div>
    );
};
