import { Carousel } from "antd";
import style from "./BgCarousel.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const cx = classNames.bind(style);

function BgCarousel({children}) {
  const carousel = useRef();
  return (
    <div className={cx("wrapper")}>
      <div onClick={() => carousel.current.prev()} className={cx('btn-left')}><FontAwesomeIcon icon={faCircleChevronLeft} /></div>
      <div onClick={() => carousel.current.next()} className={cx('btn-right')}><FontAwesomeIcon icon={faCircleChevronRight} /></div>
      <Carousel ref={carousel} autoplay draggable >
        <div>
          <img src="https://img.lovepik.com/photo/40028/3771.jpg_wh860.jpg" alt="ảnh 1" />
        </div>
        <div>
          <img src="https://thvntuonglai.vn/wp-content/uploads/2019/01/vi-sao-chon-nghe-giao-vien-nghe-giao-vien-co-y-nghia-gi-2.jpg" alt="ảnh 1" />
        </div>
        <div>
          <img src="https://websitehoctructuyen.com/wp-content/uploads/2021/11/chuyen-doi-so-giao-duc.png" alt="ảnh 1" />
        </div>
      </Carousel>
      {children}
      <div className={cx('actions')}>

          <div className={cx('actions-item')}>
              <img src="https://eduma.vn/wp-content/uploads/2015/10/logo-top-1.png" />
              <div className={cx('content')}>
                  <h3>LỚP HỌC LIVE</h3>
                  <div className={cx('link')}>
                      <span>LỊCH HỌC</span>
                      <FontAwesomeIcon icon={faChevronRight} />
                  </div>
              </div>
          </div>

          <div className={cx('actions-item')}>
              <img src="https://eduma.vn/wp-content/uploads/2015/10/logo-top-2.png" />
              <div className={cx('content')}>
                  <h3>LỚP HỌC LIVE</h3>
                  <div className={cx('link')}>
                      <span>LỊCH HỌC</span>
                      <FontAwesomeIcon icon={faChevronRight} />
                  </div>
              </div>
          </div>

          <div className={cx('actions-item')}>
              <img src="https://eduma.vn/wp-content/uploads/2015/10/logo-top-3.png" />
              <div className={cx('content')}>
                  <h3>LỚP HỌC LIVE</h3>
                  <div className={cx('link')}>
                      <span>LỊCH HỌC</span>
                      <FontAwesomeIcon icon={faChevronRight} />
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
}

export default BgCarousel;
