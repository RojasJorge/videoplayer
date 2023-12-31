import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Video player demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>...</p>
      </main>
    </div>
  );
}
