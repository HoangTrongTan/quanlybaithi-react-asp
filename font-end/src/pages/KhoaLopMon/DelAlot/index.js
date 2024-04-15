import { faCheckDouble, faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, message } from "antd";
import { useEffect, useState } from "react";
import style from "./DelAlot.module.scss";
import classNames from "classnames/bind";
import {  InfoCircleTwoTone } from "@ant-design/icons";
import * as req from '../../../ApiService';
import LoaderLocal from "../../../Component/LoaderLocal";
const cx = classNames.bind(style);

function DelAlot({ dataselect, getDependsFiles, handleDeleteXoa , khoa=false}) {
  const [open, setOpen] = useState(false);
  const [warnigText, setWarningText] = useState([]);
  const [loading,setLoading] = useState(false);
  const settext = () => {
    let values = [];
    dataselect.forEach((obj) => {
      let value = "";
      if(khoa){
        value = getDependsFiles({ma:obj.ma});
      }else{
        value = getDependsFiles({ma:obj.id});
      }
      
      if (value.length !== 0) {
        value.forEach( obj => {
          values.push(obj);
        } )
      }
    });
    setWarningText(values);
  }
  useEffect(() => {
    settext();
    console.log("vào efect");
  }, [dataselect]);
  const handleCancelModal = () => {
    setOpen(false);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    handleDeleteXoa();
    setOpen(false);
  };
  return (
    <>
      {
        loading && (<LoaderLocal /> )
      }
      <Button
        style={{ background: "#0af094" }}
        type="primary"
        icon={<FontAwesomeIcon icon={faEraser} />}
        onClick={handleOpenModal}
      >
        Xóa
      </Button>
      <Modal open={open} onCancel={handleCancelModal} footer={false}>
        <div className={cx("wrapper")}>
          <div className={cx("icon")}>
            <InfoCircleTwoTone className={cx("info")} />
          </div>
          <p>Bạn có chắc muốn xóa ??</p>
          <div className={cx("list")}>
            {warnigText.map((obj, i) => (
              <p key={i} style={{background: obj.duyet === 2?"#FED4DD":"#E6F4FF" , borderColor: obj.duyet === 2?"#F8365B":"#1677FF"}}>{obj.value}</p>
            )
            )}
          </div>
          <div className={cx("btn")}>
            <Button
              onClick={handleOk}
              type="primary"
              icon={<FontAwesomeIcon icon={faCheckDouble} />}
            >
              Ok
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DelAlot;
