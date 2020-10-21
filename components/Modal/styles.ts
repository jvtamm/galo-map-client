import styled from 'styled-components';

import { Close } from '@styled-icons/material-outlined';

export const Wrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100000;
    padding-top: 100px;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0,0,0,0.4); */

    @media(max-width: 375px) {
        padding-top: 0px;
    }
`;

export const Backdrop = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.4);
`;

export const Box = styled.div`
    margin:auto;
    background-color:#fff;
    position:relative;
    padding: 0;
    outline:0;
    width: 800px;
    height: 500px;
    overflow: hidden;
    z-index: 2;

    max-width: 90%;

    & > section {
        padding: 0;
    }

    @media(max-width: 375px) {
        max-width: 100%;
        width: 100%;
        height: 100%;
    }
`;

export const Content = styled.div`
    width: 100%;
    height: calc(100% - 40px);;
    overflow: auto;
`;

export const CloseButton = styled.button`
    cursor: pointer;
    float: right;
    padding: 10px;
`;

export const CloseIcon = styled(Close)`
    flex-shrink: 0;
    
    width: 20px;
    height: 20px;
    color: var(--primary-text);
`;
