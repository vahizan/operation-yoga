import Layout from "../ui/Layout";
import Image from "next/image";
import Article from "../ui/Article";
import Enquire from "./enquire";
import NavigationButton from "../ui/Button/NavigationButton";

export const ContactUs = () => {
  return (
    <Layout>
      <Article title={"Contact Us"}>
        <p>
          Veda Yoga Centre comprises of Veda Yogashala and Veda Spa. The centre
          provides many different activities for you to engage in.
        </p>
        <p>
          Where we are: Laxman Jhula Road, Pauri Garhwal, Rishikesh,
          Uttarakhand,
        </p>
        <p>Email: vedayogshala@gmail.com</p>
        <p>Tel: (+91) 7060577136. (+91)</p>
        <NavigationButton text={"Lesson Enquiry"} url={"/enquire"} />
      </Article>
    </Layout>
  );
};

export default ContactUs;
