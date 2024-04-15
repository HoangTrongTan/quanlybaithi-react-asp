import { useState } from "react";
import style from "./DoiMatKhau.module.scss";
import classNames from "classnames/bind";
import Draggable from "react-draggable";
import { Button, Input, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faLock, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import * as req from '../../ApiService'
import LoaderLocal from '../LoaderLocal';
import { CloseCircleOutlined } from "@ant-design/icons";
const cx = classNames.bind(style);

function DoiMatKhau({ setOpen , taikhoan }) {
  const [state, setState] = useState({
    activeDrags: 0
  });
  const [loading,setLoading] = useState(false);
  const [taikhoanData,setTaikhoanData] = useState({
    taikhoan
  });
  const onStart = () => {
    setState({ activeDrags: ++state.activeDrags });
  };

  const onStop = () => {
    setState({ activeDrags: --state.activeDrags });
  };
  const dragHandlers = { onStart: onStart, onStop: onStop };
  const handleCloseForm = () => {
    setOpen(false);
  }
  const handleOk = async () => {
    console.log(taikhoanData);
    try{
      setLoading(true);
      const rep = await req.put("TaiKhoan", taikhoanData );
      setLoading(false);
      message.success(rep , 3);
      setOpen(false);
    }catch(e){
      console.log(e);
      if (e.response.status === 409) {
        message.warning(e.response.data, 5);
      }else{
        message.error("Có lỗi xảy ra !!");
      }
      setLoading(false);
    }
  }
  const handleChange = e => {
    setTaikhoanData( prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }) )
  }
  return (
    <div>
      <Draggable {...dragHandlers}>
            <div className={cx('wrapper')}>
                {
                  loading && (
                    <LoaderLocal />
                  )
                }
                <div className={cx('form')}>
                    <div >
                        <h3>Đổi mật khẩu</h3>
                    </div>
                    <div className={cx('item')}>
                        <p>Mật khẩu cũ</p>
                        <Input.Password
                            value={taikhoanData.matkhaucu}
                            allowClear
                            prefix={<FontAwesomeIcon icon={faUnlockKeyhole} style={{color:"#A47C06"}} />}
                            placeholder="mật khẩu cũ"
                            name="matkhaucu"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('item')}>
                        <p>Mật khẩu mới</p>
                        <Input.Password
                          value={taikhoanData.matkhaumoi}
                            allowClear
                            prefix={<FontAwesomeIcon icon={faLock} style={{color:"#A47C06"}} />}
                            name="matkhaumoi"
                            placeholder="mật khẩu mới"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('btn-change-pas')}>
                        <Button 
                          style={{backgroundColor:"#A47C06", color:"#fff"}}
                          icon={<FontAwesomeIcon icon={faDice} />}
                          onClick={handleOk}
                        >
                            Thay đổi
                        </Button>
                    </div>
                    <div className={cx('btn-close')} onClick={handleCloseForm}>
                        <CloseCircleOutlined />
                    </div>
                </div>
            </div>
      </Draggable>
    </div>
  );
}

export default DoiMatKhau;
