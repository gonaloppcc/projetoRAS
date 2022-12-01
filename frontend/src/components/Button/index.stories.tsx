// Button.stories.ts|tsx

import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {
    FullWidthButton,
    PrimaryButton,
    SecondaryButton,
    TertiaryButton,
} from './index';

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Button',
    argsTypes: {
        disabled: {
            options: [true, false],
            control: {
                type: 'boolean',
            },
        },
    },
} as ComponentMeta<typeof SecondaryButton>;

export const Primary: ComponentStory<typeof PrimaryButton> = ({
    disabled,
    children,
}) => <PrimaryButton disabled={disabled}>{children}</PrimaryButton>;

export const Secondary: ComponentStory<typeof SecondaryButton> = ({
    disabled,
    children,
}) => <SecondaryButton disabled={disabled}>{children}</SecondaryButton>;

export const Tertiary: ComponentStory<typeof TertiaryButton> = ({
    disabled,
    children,
}) => <TertiaryButton disabled={disabled}>{children}</TertiaryButton>;

export const FullWidth: ComponentStory<typeof TertiaryButton> = ({
    disabled,
    children,
}) => <FullWidthButton disabled={disabled}>{children}</FullWidthButton>;

Primary.args = {
    disabled: false,
    children: 'Button',
};

Secondary.args = {
    disabled: false,
    children: 'Button',
};

Tertiary.args = {
    disabled: false,
    children: 'Button',
};

FullWidth.args = {
    disabled: false,
    children: 'Button',
};
