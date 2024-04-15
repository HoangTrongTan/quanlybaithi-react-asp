import { Tooltip, message } from "antd";
import style from "./MonItem.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark, faCircleXmark, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useDrag } from "react-dnd";
import * as request from "../../../ApiService";
const cx = classNames.bind(style);
function MonItem({ item ,isTab=[] ,render}) {
  const [{isDraging},drag] = useDrag( () => ({
    type: "mon",
    item: {id:item[0]},
    collect: (monitor) => ({
      isDraging: monitor.isDragging()
    })
  }) );
  const handleDelete = async (id) => {
    console.log(id);
    try{
      const res = await request.del("MonhocPhan/"+id);
      render();
      message.success(res, 3);
    }catch(err){
      console.log(JSON.stringify(err));
      message.error("Có lỗi xảy ra ", 3);
    }
  }
  return (
    <Tooltip title={`Mã học phần: ${item[0]}`} key={item[0]} ref={null}>
      <div className={cx("wrapper")} ref={isTab[0] ? null : drag }  style={{border:isDraging?"5px dotted #B0B0B0":"none"}} >
        <div className={cx('name')}>
            <FontAwesomeIcon icon={faBookBookmark} />
            <p>{item[1]}</p>
        </div>
        {
          isTab[0] ? (
            <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleDelete(isTab[1])} className={cx('delete-item')}/>
          ):(
            <FontAwesomeIcon icon={faEllipsis} />
          )
        }
      </div>
    </Tooltip>
  );
}

export default MonItem;
