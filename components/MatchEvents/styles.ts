import styled from 'styled-components';

interface EventItemProps {
    isAway?: boolean;
}

export const EventsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const EventItem = styled.div<EventItemProps>`
    display: grid;
    grid-template-columns: 21px 20px auto;
    grid-template-rows: 60px;
    column-gap: 20px;
    align-items: center;

    ${({ isAway }) => isAway && `
        direction: rtl;

        & > * {
            text-align: right;
        }

        & > span {
            justify-self: start;
        }

        & > div {
            direction: ltr;
            margin-left: auto;
        }
    `}
`;

export const TimeWrapper = styled.span`
    direction: ltr;
    display: flex;
    flex-flow: column;
    align-items: baseline;

    & > span {
        font-weight: bold;
        font-size: 13px;
    }
`;
