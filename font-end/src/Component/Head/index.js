import { Button, Drawer, Popover } from "antd";
import style from "./Head.module.scss";
import classNames from "classnames/bind";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBarsStaggered,
  faBell,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setTheme } from "../../StoreProvider/global";
import { useEffect,  useState } from "react";
import Sidebar from "../Sidebar";
import ThongBaoUser from "../../pages/Danhsach/ThongBaoUser";
import DoiMatKhau from "../DoiMatKhau";


const cx = classNames.bind(style);

function Head() {
  const { decodedToken, isExpired } = useJwt(sessionStorage.getItem("token"));
  const [menu, setMenu] = useState(false);
  const [menuSideBar, setMenuSideBar] = useState(false);
  const [thongbao, setThongBao] = useState(false);
  const [doiMatKhau, setDoiMatKhau] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("chucvu");
    navigate("/login");
  };
  const handleChangeTheme = (e) => {
    console.log(e.target.checked);
    dispatch(setTheme(e.target.checked));
  };

  useEffect(() => {
    if (sessionStorage.getItem("chucvu") === "gv") {
      setThongBao(true);
    }
    if (window.innerWidth <= 1024) {
      setMenu(true);
    } else {
      setMenu(false);
    }
    const resize = (window.onresize = (e) => {
      console.log(e.target.innerWidth, "-----------------------");
      const _width = e.target.innerWidth;
      if (_width <= 1024) {
        setMenu(true);
      } else {
        setMenu(false);
      }
    });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  const toggleDrawer = (value) => {
    setMenuSideBar(value);
  };
  const handleChangePassWord = () => {
    setDoiMatKhau(true);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("child")}>
        <div className={cx("left")}>
          <div className={cx("info")}>
            {menu && (
              <div className={cx("menu")} onClick={() => toggleDrawer(true)}>
                <FontAwesomeIcon icon={faBarsStaggered} />
              </div>
            )}
            <div>
              <p>{decodedToken?.TenDangNhap ?? "name"}</p>
              <p>{decodedToken?.maUser ?? "info"}</p>
            </div>
          </div>
        </div>
        <div className={cx("right")}>
          {thongbao && (
            <Popover trigger={"click"} content={() => <ThongBaoUser />}>
              <FontAwesomeIcon icon={faBell} className={cx("thongbao")} />
            </Popover>
          )}

          <Popover
            placement="bottomLeft"
            content={() => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.4em",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  block
                  onClick={handleLogout}
                  style={{ background: "orange", width: "100%" }}
                  icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
                >
                  Đăng xuất
                </Button>
                <Button
                  type="primary"
                  block
                  onClick={handleChangePassWord}
                  style={{ background: "#6E463B", width: "100%" }}
                  icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
                >
                  Đổi mật khẩu
                </Button>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7em",
                  }}
                >
                  <h3>Chế độ tối </h3>
                  <label className={cx("switch")}>
                    <input type="checkbox" onChange={handleChangeTheme} />
                    <span className={cx("slider")}></span>
                  </label>
                </div>
              </div>
            )}
          >
            <div className={cx("Settings")}>
              <FontAwesomeIcon icon={faUser} className={cx("user-menu")} />
              <FontAwesomeIcon icon={faGear} className={cx("decorate")} />
            </div>
          </Popover>
        </div>
      </div>
      <Drawer
        placement="left"
        onClose={() => toggleDrawer(false)}
        open={menuSideBar}
      >
        <Sidebar title={false} setOPenPopover={setMenuSideBar} />
      </Drawer>

      {doiMatKhau && (
          <DoiMatKhau setOpen={setDoiMatKhau} taikhoan={decodedToken.maUser}/>
      )}
    </div>
  );
}

export default Head;
