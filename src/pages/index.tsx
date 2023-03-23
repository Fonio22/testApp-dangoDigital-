import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Card from "@/components/Card";
import { useState } from "react";
import defaultProducts from "@/utils/products";

export type CardProps = {
  id: string;
  // title: string;
  price: number;
  imageURI: string;
  quantity: number;
};

const defaultTitle = "Tourmaline & Argan Oil Bar Soap";

export default function Home() {
  const [products, setProducts] = useState<CardProps[]>(defaultProducts);
  const [inputTitle, setInputTitle] = useState(defaultTitle);
  const [fontSize, setFontSize] = useState(20);

  return (
    <>
      <Head>
        <title>Test app with NextJS</title>
        <meta name="description" content="Test app with NextJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.topContainer}>
          <div>
            <p>Titulo</p>
            <input
              value={inputTitle}
              className={styles.inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />
          </div>
          <div>
            <p>Font size ({fontSize})</p>
            <input
              type="range"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              min={16}
              max={30}
            />
          </div>
        </div>

        <div className={styles.cardContainer}>
          {products.map((product, index) => (
            <Card
              key={index}
              {...{ setProducts, fontSize, ...product }}
              title={inputTitle}
            />
          ))}
        </div>

        <h1 className={styles.total}>
          Total cantidad:{" "}
          {products.reduce((acc, product) => acc + (product.quantity || 0), 0)}
        </h1>
      </main>
    </>
  );
}
