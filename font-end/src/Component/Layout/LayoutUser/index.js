import { useNavigate } from "react-router-dom";
import FooterUser from "../../FooterUser";
import HeaderUser from "../../HeaderUser";
import style from "./LayoutUser.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";

const cx = classNames.bind(style);

function LayoutUser({ children, isHome = true }) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token_hocsinh");
  
  useEffect( () => {
    if (token === null) {
      navigate("/login");
    
    }
  } , [])
  return (
    <div className={cx("wrapper")}>
      <HeaderUser isHome={isHome} />
      <div className={cx("body")}>{children}</div>
      <FooterUser />
    </div>
  );
}

export default LayoutUser;
