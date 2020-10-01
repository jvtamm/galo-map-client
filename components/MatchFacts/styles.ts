import { Close } from '@styled-icons/material-outlined';
import styled from 'styled-components';

export const MatchFactsWrapper = styled.section`
    overflow-y: auto;
    height: 100%;
    background-color: white;
    width: 100%;
    padding-top: 30px;
    position: relative;
`;

export const TabbedInfo = styled.div`
    padding: 0px 20px 20px;
`;

export const CloseIcon = styled(Close)`
    flex-shrink: 0;
    z-index: 2;
    
    width: 20px;
    height: 20px;
    color: var(--primary-text);
`;

export const CloseButton = styled.button`
    position: absolute;
    right: 0px;
    top: 10px;
    padding: 6px 12px;
    cursor: pointer;
`;
