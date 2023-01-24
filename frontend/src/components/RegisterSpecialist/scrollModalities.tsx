import {Sport} from '@domain/Event';
import React from 'react';

export interface ScrollModalitiesProps {
    changeModality: (modality: string, value: boolean) => void;
    modalities: Sport[];
    error: string;
}

export const ScrollModalities = ({
    changeModality,
    modalities,
    error,
}: ScrollModalitiesProps) => {
    // O value é uma coisa do html, tipo input com checkbox
    const checkBoxClicked = (args: Sport, value: any) => {
        changeModality(args.name, value);
    };

    return (
        <div>
            <div className="text-lg border-grey-300 border-b-2 text-slate-400">
                {/* FIXME */}
                Modalidades
            </div>

            <div className="border-solid pt-3 h-24 overflow-auto scrollbar-hide">
                {modalities.map((mod) => (
                    <div
                        key={`${mod.name}-3`}
                        className="bg-white flex flex-row items-center justify-between flex-none order-none h-10 py-2 px-5 gap-2"
                    >
                        <div className="flex flex-row gap-1">
                            <div className="pr-0">☺︎</div>
                            <div className="pl-0">{mod.name}</div>
                        </div>
                        <input
                            key={mod.name}
                            id={mod.name}
                            type="checkbox"
                            onChange={checkBoxClicked.bind(this, mod)}
                        />
                    </div>
                ))}
            </div>
            <div className="text-base mt-1 text-red-500 text-right">
                {error}
            </div>
        </div>
    );
};
