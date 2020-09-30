import styled from 'styled-components';

export const InfoBoxWrapper = styled.div`
    display: grid;
    grid-template-columns: max-content auto;
    gap: 15px 45px;
    align-items: flex-start;

    & > span {
        line-height: 1.08;
        color: var(--primary-text)
    }

    & > .header {
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0px;
    }

    & > .value {
        font-size: 13px;
        letter-spacing: 0.13px;
        display: flex;
        align-items: flex-start;
    }
`;
