import { Button, Layout, Menu, Space } from "antd";
import style from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCake,
  faClipboardList,
  faHome,
  faSchool,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function Sidebar({ title = true,setOPenPopover = null }) {
  const [expan, setExpan] = useState(false);
  const navigate = useNavigate();
  const chucvu = sessionStorage.getItem("chucvu");
  const handleClospan = () => {
    setExpan((prev) => !prev);
  };
  const handleClickItem = () => {
    if(setOPenPopover !== null){
      console.log(setOPenPopover);
      setOPenPopover(false);
    }
  }
  return (
    <div className={cx("wrapper")}>
      {title && (
        <div className={cx("admin-title")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/vi/4/49/Logo_dhsaodo_moi.PNG"
            className={cx("img-logo")}
          />
          <p>SDUVN</p>
        </div>
      )}
      <div className={cx("wrapper-child")}>
        <Menu
          style={{ width: "100%", background: "#fff", color: "#000" }}
          mode="inline"
          defaultOpenKeys={["upfile"]}
          inlineCollapsed={expan}
          onClick={({ key }) => {
            navigate(key);
          }}
          items={[
            {
              label: "Danh sách",
              key: "/adm",
              icon: <FontAwesomeIcon icon={faClipboardList} />,
              onClick: handleClickItem
            },
            ...(chucvu === "admin"
              ? [
                  {
                    label: "Quản lý thông tin",
                    key: "/qltt",
                    icon: <FontAwesomeIcon icon={faSitemap} />,
                    onClick: handleClickItem
                  },
                ]
              : []),

            ...(chucvu === "admin"
              ? [
                  {
                    label: "Quản lý môn học",
                    key: "/mhk",
                    icon: <FontAwesomeIcon icon={faSchool} />,
                    onClick: handleClickItem
                  },
                ]
              : []),
          ]}
        ></Menu>
      </div>
    </div>
  );
}

export default Sidebar;
