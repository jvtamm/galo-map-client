import React from 'react';

import Document, { Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <html>
                <Head>
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />

                    {/* <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
                        integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
                        crossOrigin=""></script> */}

                </Head>
                <body >
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

export default MyDocument;
