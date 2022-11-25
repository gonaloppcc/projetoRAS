import React, {useEffect, useState} from 'react';

export const InputForm = (props) => {
    return (
        <div className="flex flex-col pb-6 ">
            <label htmlFor={props.HtmlFor}></label>
            <input
                type={props.htmlFor}
                name={props.id}
                id={props.id}
                placeholder={props.name}
                value={props.value}
                onChange={props.handleChange}
                className={
                    props.error
                        ? 'border-red-500 border-2'
                        : 'border-black border-b-2'
                }
            />
            {props.error && (
                <span className="text-base mt-1 text-red-500">
                    {props.error}
                </span>
            )}
        </div>
    );
};
