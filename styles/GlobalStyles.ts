import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }


    html, body, #root {
        max-height: 100vh;
        max-width: 100vw;

        width: 100%;
        height: 100%;
    }

    *, button, input {
        border: 0;
        background: none;

        font-family: Lato, sans-serif
    }

    *:focus {
        outline: none;
    }

    html {
        color: var(--primary-text);
        background: var(--white);
    }

    a {
        text-decoration: none;
    }

    :root {
        --primary: #000000;
        --primary-text: #172426;
        --success: #389A5D;
        --secondary: #FFC20E;
        --light-effect: rgba(23, 36, 38, 0.1);
        --white: #ffffff;
        --warning: #D71920;
    }

    .leaflet-container {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    .leaflet-div-icon {
        background: transparent;
        border: 0;
    }
`;
