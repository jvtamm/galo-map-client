import styled from 'styled-components';

interface TimelineContainerProps {
    width?: number;
    marginLeft?: number;
}

export const TimelineContainer = styled.ul<TimelineContainerProps>`
    /* overflow: hidden; */
    display: flex;
    width: 100%;

    width: ${({ width }) => width ? `${width}px` : ''};
    margin-left: ${({ marginLeft }) => marginLeft ? `${marginLeft}px` : ''};
    transition: margin-left 400ms;
`;

interface TimelineItemProps {
    active?: boolean;
    width: number;
}

export const TimelineItem = styled.li<TimelineItemProps>`
    list-style: none;
    text-align: center;
    cursor: pointer;

    display: flex;
    /* align-items: center; */
    flex-direction: column;
    justify-content: center;

    > div {
        display: flex;
        width: ${({ width }) => `${width}px`};
        /* width: 100px; */
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px
    }

    h3 {
        color: ${({ active }) => active ? 'var(--primary-text)' : 'var(--light-grey)'};
        font-weight: ${({ active }) => active ? 'bold' : 'normal'};
        font-size: ${({ active }) => active ? '1.17em' : '0.925em'};
    }

    span {
        color: ${({ active }) => active ? 'rgba(23, 36, 38, 0.8)' : 'var(--light-grey)'};
        font-size: ${({ active }) => active ? '12px' : '10px'};
        max-height: ${({ active }) => active ? '18px' : '15px'};
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
