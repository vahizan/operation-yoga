import React, { FC } from "react";
import styles from "./bouncingLoader.module.scss";

const BouncingDotsLoader: FC = () => {
  return (
    <div className={styles.bouncingLoader}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default BouncingDotsLoader;
