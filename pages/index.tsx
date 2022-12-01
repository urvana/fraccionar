import Head from "next/head";

export default function PagesRoot() {
  return (
    <main className="text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-black flex-1">
      <Head>
        <title>Fraccionar pero en realidad es Fraccional con L al final</title>
        <meta
          name="description"
          content="Este sitio es para prevenir phishing en Fraccional. El link correcto es: https://www.fraccional.cl"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="mx-auto w-full max-w-3xl py-32 px-4">
        <header>
          <h1 className="text-xl font-semibold">Lo escribiste mal</h1>
          <div className="mt-4">
            <p>Es con L al final.</p>
            <p>Errar es humano.</p>
            <p>
              <em>Ellal</em> si escribimos <em>Errar</em> solo con Ls.
            </p>
          </div>
          <div className="mt-6">
            <p>
              <span className="hover:text-gray-500 transition-colors">
                <a className="underline" href="https://www.fraccional.cl?ref=fraccionar">
                  Enmendar mis errores ir a Fraccional.cl
                </a>
                {" 👈"}
              </span>
            </p>
          </div>
        </header>
      </section>
    </main>
  );
}
