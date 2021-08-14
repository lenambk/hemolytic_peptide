import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en" dir="ltr">
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
                        rel="stylesheet"
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:locale" content="en_US" />
                    <meta name="theme-color" content="#ffffff" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <script
                        type="text/javascript"
                        src="/static/js/behavior.js"
                    />
                    <script
                        type="text/javascript"
                        src="static/js/behavior_record.js"
                    />
                    <script
                        type="text/javascript"
                        src="/static/js/fpCollect.min.js"
                    />
                    <script
                        type="text/javascript"
                        src="/static/js/fingerprint.js"
                    />
                </Head>
                <body className="font-body text-text font-normal">
                    <div id="fb-root"></div>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;