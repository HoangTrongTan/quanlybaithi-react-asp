import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./FooterUser.module.scss";
import classNames from "classnames/bind";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { PhoneOutlined,IeOutlined, YoutubeOutlined, RedditOutlined, FacebookOutlined } from "@ant-design/icons";

const cx = classNames.bind(style);

function FooterUser() {
  return <div className={cx("wrapper")}>
    {/*  */}
      <div className={cx('footer')}>
          <div className={cx('info')}>
            <div className={cx('form-footer')}>
                <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/11/Logo-Dai-hoc-Sao-Do.png" />
                <h2>SDU</h2>
            </div>
            <div className={cx('form-footer')}>
                <PhoneOutlined />
                <p>0366668888</p>
            </div>
            <div className={cx('form-footer')}>
                <IeOutlined />
                <p>https://saodo.edu.vn/</p>
            </div>
            <div className={cx('icons')}>
                <p style={{fontSize:"30px"}}><FacebookOutlined /></p>
                <p style={{fontSize:"30px"}}><RedditOutlined /></p>
                <p style={{fontSize:"30px"}}><YoutubeOutlined  /></p>
            </div>
          </div>
          {/*  */}
          <div className={cx('actions')}>
              <h3>GIỚI THIỆU</h3>
              <p>Blog</p>
              <p>Liên lạc</p>
              <p>Bạn là nhà đào tạo</p>
          </div>
          {/*  */}
          <div className={cx('actions')}>
              <h3>Hỗ trợ</h3>
              <p>Khóa học</p>
              <p>Lịch học Live</p>
              <p>FAQs</p>
    
          </div>
          {/*  */}
          <div className={cx('actions')}>
              <h3>LINKS</h3>
              <p>Edx</p>
              <p>Havard school</p>
              <p>MIT school</p>
              <p>HOCTOAN.vn</p>
          </div>
          {/*  */}
          <div className={cx('actions')}>
              <h3>SOCIAL</h3>
              <p>Facebook</p>
              <p>Lớp học FB</p>
              <p>Youtube</p>
              <img src="https://eduma.vn/wp-content/uploads/2019/02/VNNIC.png" />
          </div>
      </div>
      <div className={cx('banquyen-chinhsach')}>
            <p>Bản quyền 2022 của SAODO.VN</p>
            <div className={cx('chinhsach')}>
                <p>Chính sách bảo mật thông tin</p>
                <p>Sitemap</p>
            </div>
      </div>
  </div>;
}

export default FooterUser;
