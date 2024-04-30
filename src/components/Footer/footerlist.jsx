import { toast } from "react-toastify";

const FooterList = ({ header, footerLinkList }) => {
  const notify = () =>
    toast.warning("Under Construction!", { autoClose: 1000 });
  return (
    <ul className="">
      <h3>{header}</h3>
      {footerLinkList.map((link, i) => {
        return (
          <li key={i} onClick={notify} className="">
            {link}
          </li>
        );
      })}
    </ul>
  );
};

export default FooterList;