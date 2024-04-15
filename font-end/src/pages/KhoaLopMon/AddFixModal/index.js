import { Button, Form, Input, Select, message } from "antd";
import style from "./FixModal.module.scss";
import classNames from "classnames/bind";
import { QuestionOutlined, UserOutlined } from "@ant-design/icons";
import * as req from "../../../ApiService";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import LoaderLocal from "../../../Component/LoaderLocal";
const cx = classNames.bind(style);
function AddFixModal({
  arrField = [],
  obj = {},
  setOpen,
  render,
  dataSelect = [],
  fieldSelect = {},
  links = {},
  nameSelect = "",
}) {
  const [value, setValue] = useState(obj);
  const [labelSelect, setLabelSelect] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    var objNew = { ...obj };
    for (let key in objNew) {
      if (typeof objNew[key] === "object") {
        delete objNew[key];
      }
    }
    setValue(objNew);
    if (dataSelect.length > 0) {
      setLabelSelect(nameSelect);
    }
  }, [obj]);

  const handleInputChange = (context) => {
    if(String(context.value) !== ""){
      context.parentNode.style.border = "1px solid green";
    }

    setValue((prev) => {
      return {
        ...prev,
        [context.name]: context.value,
      };
    });
  };
  const handleChangeSelect = (value, option) => {
    setValue((prev) => {
      return {
        ...prev,
        [fieldSelect.values]: value,
      };
    });
    setLabelSelect(option.label);
  };
  const Validate = () => {
    let isValid = true;
    if (Object.keys(fieldSelect).length !== 0) {
      console.log("vào combobox  ssss");
      if (!value[fieldSelect.values]) {
        console.log("vào combobox 2222  ssss");
        message.warning(`Bạn chưa chọn ${fieldSelect.label}`, 3);
        isValid = false;
      }
    }
    console.log("vào giữz");
    arrField.forEach((obj, index) => {
      if (!value[obj.field]) {
        message.warning(`Bạn chưa nhập ${obj.label}`, 3);
        isValid = false;
      }
    });
    return isValid;
  };
  const handleSubmit = async () => {
    console.log(value);
    try {
      if (!Validate()) {
        console.log("vào validate ");
        return;
      }
      setLoading(true)
      var res;
      if (Object.keys(obj).length === 0) {
        res = await req.post(links.add, value);
      } else {
        res = await req.put(links.fix, value);
      }
      setLoading(false)
      setOpen(false);
      render();
      
      message.success(res, 3);
    } catch (err) {
      console.log(err);
      if(err.response.status === 409){
        message.warning(err.response.data, 3);
      }else{
        message.error("Có lỗi", 3);
      }
      setLoading(false)
    }
  };
  const handleBlurInput = e => {
    if(e.target.value === ""){
      e.target.parentNode.style.border = "1px solid red";
    }else{
      e.target.parentNode.style.border = "1px solid green";
    }
  }
  return (
    <div className={cx("wrapper")}>
      {
        loading && <LoaderLocal />
      }
      <table className={cx("")}>
        {dataSelect.length > 0 && (
          <tr className={cx("form-item")}>
            <td>
              <span>{fieldSelect.icons}</span>
              <span style={{marginLeft: 5}}>{fieldSelect.label}</span>
            </td>
            <td>
              <Select
                showSearch
                value={labelSelect}
                style={{ width: 250 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (String(option?.label) ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (String(optionA?.label) ?? "")
                    .toLowerCase()
                    .localeCompare((String(optionB?.label) ?? "").toLowerCase())
                }
                options={dataSelect}
                onChange={handleChangeSelect}
                // value={ObjfilesCoppy.current.lop || labelFileInfo.lop}
              />
              {
                labelSelect === "" ? 
                (<img className={cx('img-no-value')} src="https://cdn.dribbble.com/users/219355/screenshots/16861344/question-mark-loading-animated-icon.gif" />)
                :
                (<FontAwesomeIcon icon={faCircleCheck}  className={cx('icons-sucess')}  />)
              }
              
            </td>
          </tr>
        )}
        {arrField.map((item, index) => {
          var type = !item.type ? "text" : item.type;
          return (
            <tr className={cx("form-item")}>
              <td>
                <span>{item.icon}</span>
              </td>
              <td>
                <Input
                  onBlur={handleBlurInput}
                  type={type}
                  value={value[item.field]}
                  onChange={(e) => handleInputChange(e.target)}
                  placeholder={item.label}
                  allowClear
                  name={item.field}
                />
              </td>
              {
                value[item.field] === undefined || value[item.field] === ""  ? 
                <QuestionOutlined className={cx('icons-sucess')} style={{color:"red"}} />
                :
                (<FontAwesomeIcon icon={faCircleCheck}  className={cx('icons-sucess')}  />)
              }
            </tr>
          );
        })}
      </table>
      <Button type="primary" onClick={handleSubmit} icon={<FontAwesomeIcon icon={faPaperPlane} />}>
        Gửi
      </Button>
    </div>
  );
}

export default AddFixModal;
