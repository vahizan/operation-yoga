import MainLogo from "public/logo-only.svg";
import Yogshala from "public/yogshala.svg";
import Veda from "public/veda.svg";
import YogaTradition from "public/yogatradition.svg";

import styles from "./YogshalaFancyLogo.module.scss";
import { FC } from "react";

interface Props {
  className?: string;
}
export const YogshalaFancyLogo: FC<Props> = ({ className }) => {
  const mainClassName = className
    ? `${className} ${styles.fancyLogo}`
    : styles.fancyLogo;
  return (
    <div className={mainClassName}>
      <div className={styles.fancyLogo__mainLogo}>
        <MainLogo />
      </div>

      <div className={styles.fancyLogo__companyName}>
        <div className={styles.fancyLogo__companyName__veda}>
          <Veda />
        </div>
        <div className={styles.fancyLogo__companyName__yogshala}>
          <Yogshala />
        </div>
      </div>
      <div className={styles.fancyLogo__companyTag}>
        <YogaTradition />
      </div>
    </div>
  );
};

export default YogshalaFancyLogo;
