import React, { FC } from "react";
import styles from "./ListItem.module.scss";
import { IPackage } from "../../pages/api/interfaces";
import { useRouter } from "next/router";

const PackageItem: FC<IPackage> = ({
  title,
  description,
  price,
  currency,
  isIndiaExclusive,
}) => {
  const { locale } = useRouter();
  const cost = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(price);
  if (locale !== "en-IN" && locale !== "IN" && isIndiaExclusive) {
    return null;
  }
  return (
    <div className={styles.eventItemContainer}>
      <h2>{title}</h2>
      <p>Price: {cost}</p>
      <p>{description}</p>
    </div>
  );
};

export default PackageItem;
