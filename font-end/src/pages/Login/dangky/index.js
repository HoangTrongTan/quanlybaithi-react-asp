import { Input } from "antd";
import style from "../Login.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
function DangKy() {
    return ( <div className={cx('dangky-wrapper')}>
        <div>Đăng ký</div>
        <div className={cx('input')}>
            <Input  style={{marginBottom:10,padding:"13px 10px"}} placeholder="mã sinh viên" allowClear />
            <Input  style={{marginBottom:10,padding:"13px 10px"}} placeholder="mật khẩu" allowClear />
            <Input  style={{marginBottom:10,padding:"13px 10px"}} placeholder="Tên dăng nhập" allowClear />
        </div>  
    </div> );
}

export default DangKy;