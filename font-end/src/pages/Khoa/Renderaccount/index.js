import { useState } from "react";
import style from "../Khoa.module.scss";
import classNames from "classnames/bind";
import { Input } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
const cx = classNames.bind(style);
function Renderaccount({ arr = [] }) {
  const [findedItem, setFindedItem] = useState(arr);
  const [serviceFind, setServiceFind] = useState(false);

  const handleDoubleClick = () => {
    setServiceFind(true);
  };
  const handleChange = (e) => {
    if(!e.target.value.trim()){
        setFindedItem(arr);
    }else{
        const arrs = arr.filter( ite => ite.tendangnhap.toUpperCase().includes(e.target.value.toUpperCase()) );
        setFindedItem(arrs);
    }
  } 
  const handleCloseInput = () => {
    setServiceFind(false);
    setFindedItem(arr);
  }
  return (
    <>
      {serviceFind ? (
        <div style={{display:"flex", alignItems:"center"}}>
            <Input
              allowClear
              prefix={<SearchOutlined />}
              placeholder="Search here ...."
              onChange={handleChange}
            />
            <div onClick={handleCloseInput } style={{cursor:"pointer", padding: 3, background: "#BEBEBE", borderRadius:3, color:"#fff"}}><CloseOutlined /></div>
        </div>
      ) : (
        <h5 className={cx("title")} onDoubleClick={handleDoubleClick}>
          Tài khoản
        </h5>
      )}
      <div className={cx("list")}>
        {findedItem.map((obj, i) => (
          <p>{obj.tendangnhap}</p>
        ))}
      </div>
    </>
  );
}

export default Renderaccount;
