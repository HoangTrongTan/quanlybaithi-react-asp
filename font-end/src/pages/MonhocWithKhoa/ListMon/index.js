import { useEffect, useState } from "react";
import MonItem from "../MonItem";
import style from "./ListMon.module.scss";
import classNames from "classnames/bind";
import * as request from "../../../ApiService";
import { message } from "antd";
import Search from "../Search";
import NoData from "../NoData";
import LoaderLocal from "../../../Component/LoaderLocal";
const cx = classNames.bind(style);
function ListMon() {
  const [loading, setLoading] = useState(false);
  const [listMon, setListMon] = useState([]);
  const render = async () => {
    try {
      setLoading(true);
      const res = await request.get("MonHocKhoa");
      setLoading(false);
      setListMon(res);
    } catch (err) {
      console.log(JSON.stringify(err));
      message.error("Lỗi thay đổi dữ liệu các tabs", 3);
    }
  };
  useEffect(() => {
    render();
  }, []);
  return (
    <div className={cx("wrapper")}>
      {
        loading && <LoaderLocal />
      }
        {
            listMon.length === 0 && <NoData /> 
        }
      <h3 style={{ textAlign: "center" }}>Danh sách tất cả môn học</h3>
      <div className={cx("list")}>
        <Search
          setList={setListMon}
          link={"MonHocKhoa/find/"}
          renderNull={render}
        />
        {listMon.map((obj, index) => (
          <MonItem item={[obj.ma, obj.tenhocphan]} />
        ))}
      </div>
    </div>
  );
}

export default ListMon;
