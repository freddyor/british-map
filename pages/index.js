import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="The greatest historic map in York 🇬🇧" />
        <title>Britmap</title>
        <link rel="icon" href="/videos/favicon.png" type="image/png" sizes="32x32" />
        <style>
          {`
            body, html {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              font-family: 'Poppins', sans-serif;
              display: flex;
              flex-direction: column;
            }

            #map {
              flex: 1;
              width: 100%;
              margin: 0;
              padding: 0;
            }
          `}
        </style>
      </Head>

      <div id="map"></div>

      {/* Custom JavaScript logic for your map (import it in your project) */}
      <script type="module" src="/index.js"></script>
    </div>
  );
}
