import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import defaultProducts from "@/utils/products";

export type CardProps = {
  title: string;
  price: number;
  imageURI: string;
  quantity: number;
};

export type productType = {
  [key: string]: CardProps;
};

export default function Home() {
  const [products, setProducts] = useState<productType>(defaultProducts);
  const [onSelected, setOnSelected] = useState<string | null>(null);
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
              value={onSelected ? products[onSelected]?.title : ""}
              className={styles.inputTitle}
              disabled={!onSelected}
              onChange={(e) => {
                if (!onSelected) return;
                setProducts((prev) => ({
                  ...prev,
                  [onSelected || ""]: {
                    ...prev[onSelected || ""],
                    title: e.target.value,
                  },
                }));
              }}
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
          {Object.entries(products).map(([id, product], index) => {
            return (
              <Card
                key={index}
                {...product}
                setProducts={setProducts}
                fontSize={fontSize}
                id={id}
                onSelected={onSelected}
                setOnSelected={setOnSelected}
              />
            );
          })}
        </div>

        <h1 className={styles.total}>
          Total cantidad:{" "}
          {Object.entries(products).reduce(
            (acc, [id, product]) => acc + (product.quantity || 0),
            0
          )}
        </h1>
      </main>
    </>
  );
}
