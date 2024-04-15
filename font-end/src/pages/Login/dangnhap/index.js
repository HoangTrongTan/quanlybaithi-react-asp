import { Button, Input, message, notification } from "antd";
import style from "../Login.module.scss";
import classNames from "classnames/bind";
import { EyeTwoTone, EyeInvisibleOutlined, QuestionOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import * as request from "../../../ApiService";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Component/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faCheckCircle,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(style);
function DangNhap() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [taikhoan, setTaiKhoan] = useState({
    username: "",
    userpassHash: "",
  });
  const handleTaiKhoan = (name, value) => {
    setTaiKhoan((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const checkChucVu = (str) => {
    if (str === "gv") {
      return true;
    } else {
      return true;
    }
  };
  function validate() {

    if(taikhoan.username.length === 0){
      message.warning("tài khoản đang để trống !!", 3);
      return false;
    }
    if(taikhoan.userpassHash === ""){
      message.warning("mật khẩu đang để trống !!", 3);
      return false;
    }
    return true;
  }
  const handleLogin = async () => {
    try {
      if(!validate()){
        return;
      }
      setLoading(true);
      const res = await request.post("TaiKhoan/login", taikhoan);
      setLoading(false);
      if (res.loai === "hs") {
        sessionStorage.setItem("token_hocsinh", res.token);
        sessionStorage.setItem("chucvu_hocsinh", res.loai);
        navigate("/");
        return;
      }
      if (!checkChucVu(res.loai)) {
        return;
      }
      sessionStorage.setItem("token", res.token);
      sessionStorage.setItem("chucvu", res.loai);
      notification.success({
        message: "đăng nhập thành công",
        duration: 3,
      });
      setTimeout(() => {
        navigate("/adm");
      }, 500);
    } catch (err) {
      setLoading(false);
      console.log(JSON.stringify(err.message));
      message.error("Tài khoản hoặc mật khẩu không đúng !", 3);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        handleLogin();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className={cx("dang-nhap")}>
      {loading && <Loader />}
      <div className={cx("right")}>
        <div className={cx('right-form')}>
          <h2>Đăng nhập hệ thống</h2>
          <div className={cx("form-input")}>
            <div className={cx('login-item')} >
              {
                taikhoan.username === "" ? (
                  <QuestionOutlined className={cx('icon')} style={{color:"red"}} />
                ):(
                  <FontAwesomeIcon className={cx('icon')} icon={faCheckCircle} />
                )
              }
              <Input
                prefix={<FontAwesomeIcon icon={faUser} style={{color:"blue"}} />}
                value={taikhoan.username}
                onChange={(e) => handleTaiKhoan("username", e.target.value)}
                style={{ marginBottom: 10, padding: "13px 10px" , borderRadius: 20 }}
                placeholder="Tài khoản"
                allowClear
              />
            </div>
            <div className={cx('login-item')}>
            {
                taikhoan.userpassHash === "" ? (
                  <QuestionOutlined className={cx('icon')} style={{color:"red"}} />
                ):(
                  <FontAwesomeIcon className={cx('icon')} icon={faCheckCircle} />
                )
              }
              <Input.Password
                prefix={<FontAwesomeIcon icon={faLock} style={{color:"blue"}} />}
                value={taikhoan.userpassHash}
                onChange={(e) => handleTaiKhoan("userpassHash", e.target.value)}
                style={{ marginBottom: 10, padding: "13px 10px" ,borderRadius: 20 }}
                placeholder="mật khẩu"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
          </div>
  
          {/* <div style={{ textAlign: "center" }}> */}
            <Button
              icon={<FontAwesomeIcon icon={faArrowRightToBracket} />}
              type="primary"
              onClick={handleLogin}
              draggable
              style={{borderRadius: 20, width: "100%", background: "linear-gradient(to bottom, rgb(1, 1, 194), rgb(105, 105, 238))"}}
            >
              Đăng nhập
            </Button>
          {/* </div> */}
        </div>
      </div>
      <div className={cx("left")}>
        <div className={cx('left-form')}>
          <h1>WELCOME BACK</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipíicing</p>
        </div>
      </div>
    </div>
  );
}

export default DangNhap;
