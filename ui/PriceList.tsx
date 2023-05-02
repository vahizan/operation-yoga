import { FC } from "react";
import PackageItem from "./ListItem/PackageItem";
import { IPackage } from "../pages/api/interfaces";

interface Props {
  packages: IPackage[] | [];
}

const PriceList: FC<Props> = ({ packages }) => {
  return (
    <div>
      <>
        {packages.map((packageItem: IPackage, index) => (
          <PackageItem
            description={packageItem.description}
            title={packageItem.title}
            price={packageItem.price}
            currency={packageItem.currency}
            key={index}
            isIndiaExclusive={packageItem.isIndiaExclusive}
            type={packageItem.type}
          />
        ))}
      </>
    </div>
  );
};

export default PriceList;
