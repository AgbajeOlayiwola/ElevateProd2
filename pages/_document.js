import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }
    render() {
        return (
            <Html>
                <Head>
                    <Script src="https://web-button.mati.io/button.js"></Script>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,100;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                    />
                    {/*/// <link
                        href="https://fonts.googleapis.com/css2?family=Mulish:wght@200;400&family=Playfair+Display&display=swap"
                        rel="stylesheet"
                    /> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
