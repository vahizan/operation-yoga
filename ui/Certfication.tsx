import Image from "next/image";

const Certification = () => {
  return (
    <>
      <Image
        width={70}
        height={70}
        src={"/../public/rys100-yogaalliance.png"}
        alt={"rhys yoga alliance logo"}
      />
      <Image
        width={70}
        height={70}
        src={"/../public/yacep-yogaalliance.png"}
        alt={"yacep yoga alliance logo"}
      />
    </>
  );
};

export default Certification;
