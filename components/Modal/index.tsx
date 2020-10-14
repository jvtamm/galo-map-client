/* Extracted from https://sandstorm.de/de/blog/post/reusable-modal-with-react-hooks-and-portals.html */

import React from 'react';
import ReactDOM from 'react-dom';

import { Wrapper, Box, Content, CloseButton, CloseIcon, Backdrop } from './styles';

type ModalProps = {
  children: React.ReactChild
  closeModal: () => void
}

// eslint-disable-next-line react/display-name
export const Modal = React.memo<ModalProps>(({ children, closeModal }) => {
    const domEl = document.getElementById('modal-root');

    if (!domEl) return null;

    const closeNonPropagate = (event) => {
        event.stopPropagation();
        closeModal();
    };

    // This is where the magic happens -> our modal div will be rendered into our 'modal-root' div, no matter where we
    // use this component inside our React tree
    return ReactDOM.createPortal(
        <Wrapper>
            <Backdrop onClick={closeNonPropagate} />
            <Box>
                <CloseButton onClick={closeModal}>
                    <CloseIcon />
                </CloseButton>
                <Content>
                    {children}
                </Content>
            </Box>
        </Wrapper>,
        domEl
    );
});

export default Modal;
