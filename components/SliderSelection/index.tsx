// import React, { useState } from 'react';
import React from 'react';
import { Container, ButtonContainer, ArrowLeft, ArrowRight } from './styles';

export interface SwiperOption<T> {
    label: string;
    value: T;
}

interface SwiperProps<T> {
    color?: string;
    value: SwiperOption<T>;
    next?: T;
    previous?: T;
    // initialValue?: T;
    // options: SwiperOption<T>[];
    onChange: Function;
    children?: React.ReactChildren;
}

// export const Swiper = ({ color, options, initialValue, onChange }: SwiperProps<any>) => {
export const Swiper = ({ color, value, next, previous, onChange }: SwiperProps<any>) => {
    // const sortedOptions = options.sort((a, b) => a.value - b.value);

    // let initialIndex = sortedOptions.findIndex(({ value }) => value === initialValue);
    // if (initialIndex < 0) initialIndex = 0;

    // const [selectedIndex, setSelectedIndex] = useState(initialIndex);

    // function swipe(increment: number) {
    //     const newIndex = selectedIndex + increment;

    //     if (newIndex >= 0 && newIndex < sortedOptions.length) {
    //         setSelectedIndex(selectedIndex + increment);
    //         onChange(sortedOptions[selectedIndex]);
    //     }
    // }

    return (
        <Container color={color}>
            <ButtonContainer
                disabled={!previous}
                onClick={() => onChange(previous)}
                // disabled={selectedIndex === 0}
                // onClick={() => swipe(-1)}
            >
                <ArrowLeft />
            </ButtonContainer>

            {/* <label>{sortedOptions[selectedIndex]?.label}</label> */}
            <label>{value.label}</label>

            <ButtonContainer
                disabled={!next}
                onClick={() => onChange(next)}
                // disabled={!sortedOptions.length || selectedIndex === sortedOptions.length - 1}
                // onClick={() => swipe(1)}
            >
                <ArrowRight />
            </ButtonContainer>
        </Container>
    );
};
