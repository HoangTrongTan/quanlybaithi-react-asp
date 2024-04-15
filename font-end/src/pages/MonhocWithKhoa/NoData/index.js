import style from "./NoData.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
function NoData() {
    return ( <div className={cx('wrapper')}>
            <img src="https://i.pinimg.com/originals/5d/35/e3/5d35e39988e3a183bdc3a9d2570d20a9.gif" />
    </div> );
}

export default NoData;