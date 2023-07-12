import MainLogo from "public/logo-only.svg";
import Yogshala from "public/yogshala.svg";
import Veda from "public/veda.svg";
import YogaTradition from "public/yogatradition.svg";

import styles from "./YogshalaFancyLogo.module.scss";

export const YogshalaFancyLogo = () => {
  return (
    <div className={styles.fancyLogo}>
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
