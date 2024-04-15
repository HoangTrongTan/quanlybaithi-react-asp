import { Tabs, message } from "antd";
import { useEffect, useState } from "react";
import style from "./KhoaLopMon.module.scss";
import classNames from "classnames/bind";
import Khoa from "../Khoa";
import Lop from "../Lop";
import KhoaDK from "../KhoaDK";
import Mon from "../Mon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAllRootFiles } from "../../StoreProvider/global";
import * as req from '../../ApiService'
const cx = classNames.bind(style);

function KhoaLopMon() {
  const chucvu = sessionStorage.getItem("chucvu");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setDataRootFile = async () => {
    try{
      const rep = await req.get("Files/getDependsFiles");
      dispatch( setAllRootFiles(rep) );
    }catch(e){
      message.error("có lỗi load dữ liệu gốc", 4);
      console.log(e);
    }
  }
  useEffect( () => {
    if(!chucvu){
      navigate("/login");
    }
    document.title = "Quản lý thông tin"
    setDataRootFile();  
  } ,[])
  useEffect( () => {
    if(chucvu === "gv"){
      navigate("/adm")
    }
  },[] )
  const [tabs, setTabs] = useState([
    {
      label: "Khoa",
      key: "Danh sách khoa",
      children: <Khoa />,
      
    },
    {
      label: "Danh sách Khóa",
      key: "khoadk",
      children: <KhoaDK />,
    },
    {
      label: "Danh sách Lớp",
      key: "lop",
      children: <Lop />,
    },
    {
      label: "Danh sách môn",
      key: "mon",
      children: <Mon />,
    },
  ]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <Tabs items={tabs} />
      </div>
    </div>
  );
}

export default KhoaLopMon;
