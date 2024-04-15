
import Footer from "../../Footer";
import Head from "../../Head";
import Sidebar from "../../Sidebar";
import style from "./LayoutMain.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function LayoutMain({ children }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("sidebar")}>
        <Sidebar />
      </div>
      <div className={cx("container")}>
        <div className={cx('header')}>
            <Head />
        </div>
        <div className={cx('content')}>{children}</div>
        <Footer />
      </div>
    </div>
  );
}

export default LayoutMain;
