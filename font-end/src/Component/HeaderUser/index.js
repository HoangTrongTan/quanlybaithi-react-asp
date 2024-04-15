import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BgCarousel from "./BgCarousel";
import style from "./HeaderUser.module.scss";
import classNames from "classnames/bind";
import { PhoneOutlined } from "@ant-design/icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import MenuUser from "../MenuUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const cx = classNames.bind(style);

function HeaderUser({ children, isHome }) {
  var Layout = isHome ? BgCarousel : "";
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token_hocsinh");
  console.log("token user trang chủ---------------------------", token);
  if (token === null) {
    navigate("/login");
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("lien-he")}>
        <div className={cx("lien__he-left")}>
          <p>Bạn có câu hỏi?</p>
          <div className={cx("form_lienhe")}>
            <PhoneOutlined />
            <p> 0369 036663 </p>
          </div>
          <div className={cx("form_lienhe")}>
            <FontAwesomeIcon icon={faEnvelope} />
            <p> faksfgas@gmail.com </p>
          </div>
        </div>
        <div className={cx("lien__he-right")}>
          <a>Đăng ký</a>
          <a>Đăng nhập</a>
        </div>
      </div>
      <div className={cx("bg-menu")}>
        <Layout>
          <MenuUser />
        </Layout>
      </div>
    </div>
  );
}

export default HeaderUser;
