import { Dropdown } from "antd";
import style from "./MenuUser.module.scss";
import classNames from "classnames/bind";
import { menuItemTrangChu } from "./menuItem";

const cx = classNames.bind(style);

function MenuUser() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("menu")}>
        <div className={cx("logo")}>
          <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/11/Logo-Dai-hoc-Sao-Do.png" />
          <h2>SAODO</h2>
        </div>
        <div className={cx("actions-menu")}>
          <div className={cx("menu-list")}>
            <h2>TRANG CHỦ</h2>
            <div className={cx("menu-tem")}>
              <p>GIỚI THIỆU</p>
              <p>BLOG</p>
              <p>LIÊN HỆ</p>
              <p>SỰ KIỆN</p>
            </div>
          </div>
          <div className={cx("menu-list")}>
            <h2>GIỚI THIỆU</h2>
            <div className={cx("menu-tem")}>
              <p>GIỚI THIỆU</p>
              <p>BLOG</p>
              <p>LIÊN HỆ</p>
              <p>SỰ KIỆN</p>
            </div>
          </div>
          <div className={cx("menu-list")}>
            <h2>BLOG</h2>
            <div className={cx("menu-tem")}>
              <p>GIỚI THIỆU</p>
              <p>BLOG</p>
              <p>LIÊN HỆ</p>
              <p>SỰ KIỆN</p>
            </div>
          </div>
          
          <h2>LIÊN HỆ</h2>
          <h2>SỰ KIỆN</h2>
        </div>
      </div>
    </div>
  );
}

export default MenuUser;
