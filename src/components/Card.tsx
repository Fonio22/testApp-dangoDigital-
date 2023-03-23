import Image from "next/image";
import React from "react";
import styles from "./Card.module.css";
import Link from "next/link";
import { CardProps } from "@/pages";

type Props = CardProps & {
  title: string;
  fontSize: number;
  setProducts: React.Dispatch<React.SetStateAction<CardProps[]>>;
};

export default function Card(props: Props) {
  const { id, title, price, imageURI, quantity, setProducts, fontSize } = props;

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Metodo sencillo, en este caso funciona, pero no es la mejor forma de hacerlo
    //ya que si tuvieramos mas de 100 productos, esto seria muy ineficiente
    //Otro caso para hacerlo es separar el estado de input aparte y luego usar un useEffect para actualizar el estado de products (Metodo eficiente)

    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: parseInt(e.target.value),
            }
          : product
      )
    );
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
          }}
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
