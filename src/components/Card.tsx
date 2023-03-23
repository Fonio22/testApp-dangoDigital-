import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import Link from "next/link";
import { CardProps, productType } from "@/pages";

type Props = CardProps & {
  id: string;
  fontSize: number;
  setProducts: React.Dispatch<React.SetStateAction<productType>>;
  onSelected: string | null;
  setOnSelected: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function Card(props: Props) {
  const {
    id,
    title,
    price,
    imageURI,
    quantity,
    setProducts,
    fontSize,
    onSelected,
    setOnSelected,
  } = props;

  const [screenSize, getDimension] = useState({
    dynamicWidth: 0,
    dynamicHeight: 0,
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newQuantity = parseInt(value);
    setProducts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity: newQuantity,
      },
    }));
  };

  return (
    <div className={styles.container}>
      <Image
        src={imageURI}
        alt="NextJS"
        width={200}
        height={150}
        className={styles.image}
        priority
      />

      <div className={styles.titleContainer}>
        <h3
          className={styles.titleProduct}
          style={{
            fontSize: `${fontSize}px`,
            color: onSelected === id ? "red" : "black",
            maxWidth: `${screenSize.dynamicWidth - 75}px`,
          }}
          onClick={() => setOnSelected(id)}
        >
          {title}
        </h3>
      </div>

      <div className={styles.inputPriceContainer}>
        <h6 className={styles.price}>${price.toFixed(2)}</h6>
        <input
          className={styles.input}
          type="number"
          value={quantity}
          onChange={onChangeInput}
          placeholder="0"
          min={0}
        />
      </div>

      <p className={styles.description}>
        Recharge your skin with the super energizing power of finely crushed
        tourmaline powder blended with natural complexion
      </p>

      <button className={styles.button}>Add to cart</button>

      <Link href="/" className={styles.learnMore}>
        Learn More
      </Link>
    </div>
  );
}
