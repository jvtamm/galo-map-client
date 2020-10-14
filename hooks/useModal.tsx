import React, { useState } from 'react';

import { Modal } from '@components/Modal';

// Renders a modal to the modal root and handles the visibility state
// of this modal.
//
// NOTE: Each modal you want to render should use a separate hook!!!
// Otherwise your modals will share their visibility state which might lead
// to overlapping and unclosable elements.
export const useModal = () => {
    const [isVisible, setIsVisible] = useState(false);

    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);

    const RenderModal = ({ children }: { children: React.ReactChild }) => (
        <>
            {isVisible && <Modal closeModal={hide}>{children}</Modal>}
        </>
    );

    return {
        show,
        hide,
        RenderModal
    };
};
