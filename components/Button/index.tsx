import React from 'react';

import { ButtonBaseStyle } from './styles';

interface ButtonProps {
    color: string;
    textColor: string;
    onClick?: (event) => void;
    children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...rest }: ButtonProps) => {
    return <ButtonBaseStyle {...rest}>{children}</ButtonBaseStyle>;
};
