import { useImperativeHandle, useRef, useState } from "react";
import style from "../UpFiles.module.scss";
import classNames from "classnames/bind";
import { DeleteOutlined } from "@ant-design/icons";
import { forwardRef } from "react";
const cx = classNames.bind(style);
function FormFile( { setFile } , ref) {
    const [filechoose,setFileChoose] = useState();
    const [isDraging,setIsDraging] = useState(false);
    const input = useRef();

    const handleOpenFile = () => {
        input.current.click();
    }
    const setNameFile = (name) => {
      var str = name;
        if(str.length > 17){
            const splice = str.split('.');
            const length_0 = splice[0].length-1;
            const str1 = splice[0].slice(0,4);
            const str2 = splice[0].slice(length_0 - 4, length_0);
            str = str1 +"..."+ str2 + "."+ splice[1];
        }
        setFileChoose(str);
    }
    const handleChange = e => {
        setNameFile(e.target.files[0].name);
        setFile(e.target.files[0]);
    }
    const handleDel = () => {
        setFileChoose(null);
    }
    const OnDragOver = (e) => {
      e.preventDefault();
      setIsDraging(true);
      e.dataTransfer.dropEffect = "copy";
    }
    const OnDragLeave = e => {
      e.preventDefault();
      setIsDraging(false);
    }
    const OnDrop = e => {

      e.preventDefault();
      setIsDraging(false);
      setNameFile(e.dataTransfer.files[0].name);
      setFile(e.dataTransfer.files[0]);
    }
    useImperativeHandle( ref , () => ({
      DelTextFile(){
        setFileChoose(null);
      }
    }) )
  return (
    <div className={cx("upload-wrapper")}>
      <div className={cx("upload-form", {isDraging:isDraging})} onClick={handleOpenFile} onDragOver={OnDragOver} onDragLeave={OnDragLeave} onDrop={OnDrop} >
        <p>Thả hoặc chọn tệp</p>
        <input type="file" hidden ref={input} onChange={handleChange} />
      </div>
      {
        filechoose && (
            <p className={cx('file-name')}>{filechoose}<span onClick={handleDel} className={cx('icon-del')}><DeleteOutlined /> </span></p>
        )
      }
    </div>
  );
}

export default forwardRef(FormFile);
