import Document, { Head, Main, NextScript } from 'next/document';

export default class extends Document {
  static async getInitialProps(ctx) {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          {/* <!-- Must --> */}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
          <meta name="description" content="Hjälp oss rädda lokala företag under COVID-19 krisen genom att köpa presentkort!" />
          <meta name="keywords" content="Keywords" />

          {/* <!-- Android  --> */}
          <meta name="theme-color" content="black" />
          <meta name="mobile-web-app-capable" content="yes" />

          {/* <!-- iOS --> */}
          <meta name="apple-mobile-web-app-title" content="Application Title" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />

          {/* <!-- Windows  --> */}
          <meta name="msapplication-navbutton-color" content="black" />
          <meta name="msapplication-TileColor" content="black" />
          <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
          <meta name="msapplication-config" content="browserconfig.xml" />

          {/* <!-- Pinned Sites  --> */}
          <meta name="application-name" content="Application Name" />
          <meta name="msapplication-tooltip" content="Tooltip Text" />
          <meta name="msapplication-starturl" content="/" />

          {/* <!-- Tap highlighting  --> */}
          <meta name="msapplication-tap-highlight" content="no" />

          {/* <!-- UC Mobile Browser  --> */}
          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />

          {/* <!-- Disable night mode for this page  --> */}
          <meta name="nightmode" content="enable/disable" />

          {/* <!-- Layout mode --> */}
          <meta name="layoutmode" content="fitscreen/standard" />

          {/* <!-- imagemode - show image even in text only mode  --> */}
          <meta name="imagemode" content="force" />

          {/* <!-- Orientation  --> */}
          <meta name="screen-orientation" content="portrait" />

          <meta property="og:url" content="https://favoriten.nu" />
          <meta property="og:title" content="Favoriten.nu - Stötta din lokala favoritrestaurang" />
          <meta property="og:description" content="Hjälp oss rädda lokala företag under COVID-19 krisen genom att köpa presentkort!" />
          <meta property="og:image" content="https://saveourfaves.org/snugtop.jpg" />
          <meta property="og:type" content="website" />

          {/* <!-- Main Link Tags  --> */}
          <link href="/images/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="/images/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
          <link href="/images/icons/favicon-48x48.png" rel="icon" type="image/png" sizes="48x48" />

          {/* <!-- iOS  --> */}
          <link href="/images/icons/apple-icon.png" rel="apple-touch-icon" />
          <link href="/images/icons/apple-icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />
          <link href="/images/icons/apple-icon-120x120.png" rel="apple-touch-icon" sizes="120x120" />
          <link href="/images/icons/apple-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />

          {/* <!-- Startup Image  --> */}
          <link href="/images/icons/apple-icon.png" rel="apple-touch-startup-image" />

          {/* <!-- Pinned Tab  --> */}
          <link href="images/icons/zeit.svg" rel="mask-icon" size="any" color="black" />

          {/* <!-- Android  --> */}
          <link href="/images/icons/icon-192x192.png" rel="icon" sizes="192x192" />
          <link href="/images/icons/icon-128x128.png" rel="icon" sizes="128x128" />

          {/* <!-- Others --> */}
          <link href="/images/icons/favicon.icon" rel="shortcut icon" type="image/x-icon" />

          {/* <!-- UC Browser  --> */}
          <link href="images/icons/icon-52x52.png" rel="apple-touch-icon-precomposed" sizes="57x57" />
          <link href="images/icons/icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />

          {/* <!-- Manifest.json  --> */}
          <link href="/manifest.json" rel="manifest" />
          <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,700" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="styl</link>esheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
