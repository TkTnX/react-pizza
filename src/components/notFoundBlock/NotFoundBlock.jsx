import React from "react";
import styles from "./NotFoundBlock.module.scss";
export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <span>🤨</span>
      <h1>Ничего не найдёно! </h1>
      <p className={styles.description}>
        К сожалению данная страница отсутствует на нашем сайте!
      </p>
    </div>
  );
};
