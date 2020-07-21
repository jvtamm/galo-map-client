import React from 'react';
import { Container, CloseIcon, CloseButton } from './styles';

interface ChipProps {
    text: string;
    color: string;
    handleClose: (event) => void;
    children?: React.ReactNode;
}

const Chip: React.FC<ChipProps> = ({ text, color, handleClose }: ChipProps) => {
    return (
        <Container color={color}>
            <label>{text}</label>
            <CloseButton onClick={handleClose}>
                <CloseIcon />
            </CloseButton>
        </Container>
    );
};

export default Chip;
