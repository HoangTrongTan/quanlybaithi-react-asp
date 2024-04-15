import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import style from "./MonhocWithKhoa.module.scss";
import classNames from "classnames/bind";
import { HTML5Backend } from "react-dnd-html5-backend";
import ListMon from "./ListMon";
import BoxKhoa from "./BoxKhoa";
import { message, notification } from "antd";
import { useNavigate } from "react-router-dom";


const cx = classNames.bind(style);

function MonhocWithKhoa() {
  const chucvu = sessionStorage.getItem("chucvu");
  const navigate = useNavigate();
  
  useEffect( () => {
    if(chucvu === "gv"){
      navigate("/adm");
    }
    if(!chucvu){
      navigate("/login");
    }
    document.title = "Quản lý môn học"
  },[] )
  useEffect(() => {
    const openNotification = () => {
      notification.info({
        message: '*****',
        description: 'Kéo mục môn thả vào danh sách khoa !!',
      });
    };

    const timeout = setTimeout(() => {
      notification.destroy(); // Đóng thông báo sau 10 giây
    }, 30000); // 10 giây

    openNotification();

    // Sử dụng return để làm "cleanup" khi component bị unmount hoặc useEffect được gọi lại.
    return () => clearTimeout(timeout);
  }, [])
  return (
    <div className={cx('wrapper')}>
      
      <div className={cx('content')}>
        <DndProvider backend={HTML5Backend}>
                <ListMon />
                <BoxKhoa />
        </DndProvider>
      </div>
    </div>
  );
}

export default MonhocWithKhoa;

