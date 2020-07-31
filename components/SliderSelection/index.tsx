// import React, { useState } from 'react';
import React from 'react';
import Link from 'next/Link';

import { Container, AnchorWrapper, ArrowLeft, ArrowRight } from './styles';

export interface SwiperOption<T> {
    label: string;
    value: T;
}

interface SwiperProps<T> {
    color?: string;
    value: SwiperOption<T>;
    next?: string;
    previous?: string;
    // initialValue?: T;
    // options: SwiperOption<T>[];
    // onChange: Function;
    children?: React.ReactChildren;
}

// export const Swiper = ({ color, options, initialValue, onChange }: SwiperProps<any>) => {
export const Swiper = ({ color, value, next, previous }: SwiperProps<any>) => {
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
            <Link href={previous}>
                <a>
                    <AnchorWrapper disabled={!previous}>
                        <ArrowLeft />
                    </AnchorWrapper>
                </a>
            </Link>

            {/* <label>{sortedOptions[selectedIndex]?.label}</label> */}
            <label>{value.label}</label>

            <Link href={next}>
                <a>
                    <AnchorWrapper disabled={!next}>
                        <ArrowRight />
                    </AnchorWrapper>
                </a>
            </Link>
        </Container>
    );
};
