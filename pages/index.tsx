import Head from "next/head";
import Image from "next/image";

import img from "~/public/mestreensinador.webp";

export default function PagesRoot() {
  const href = "https://www.fraccional.cl?ref=fraccionar";

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
          <h1 className="text-6xl font-semibold">Lo escribiste mal</h1>
          <div className="mt-8 text-2xl">
            <p>Es con L al final.</p>
            <p>Errar es humano.</p>
            <p>
              <em>Ellal</em> si escribimos <em>Errar</em> solo con Ls.
            </p>
          </div>
          <div className="mt-8 text-2xl">
            <p>
              <span className="hover:text-gray-500 transition-colors">
                <a className="underline" href={href}>
                  Enmendar mis errores e ir a Fraccional.cl
                </a>
                {" 👈"}
              </span>
            </p>
          </div>

          <div className="mt-20">
            <a className="underline" href={href}>
              <Image src={img} alt="Fraccional cuando era bebé" />
            </a>
            <p className="text-gray-500 text-sm mt-1">Fraccional cuando era bebé</p>
          </div>
        </header>
      </section>
    </main>
  );
}
