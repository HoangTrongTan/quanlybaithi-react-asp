import { Segmented, Tabs, message } from "antd";
import { useEffect, useRef, useState } from "react";
import style from "./BoxKhoa.module.scss";
import classNames from "classnames/bind";
import * as request from "../../../ApiService";
import MonItem from "../MonItem";
import { useDrop } from "react-dnd";
import Search from "../Search";
import NoData from "../NoData";
import LoaderLocal from "../../../Component/LoaderLocal";
const cx = classNames.bind(style);
function BoxKhoa() {
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [listMon, setListMon] = useState([]);
  const Khoa = useRef(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "mon",
    drop: (item) => handleAddItem(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const renderMon = async (value) => {
    try {
      setLoading(true);
      const res = await request.get("MonhocPhan/khoa-hocphan/" + value);
      setLoading(false);
      setListMon(res);
    } catch (err) {
      console.log(JSON.stringify(err));
      message.error("Lỗi thay đổi dữ liệu các tabs", 3);
    }
  };
  const handleAddItem = async (item) => {
    console.log(item, Khoa.current);
    try {
      const data = {
        mahocphan: item.id,
        khoa: Khoa.current,
      };
      const res = await request.post("MonhocPhan", data);
      renderMon(Khoa.current);
      message.success(res, 3);
    } catch (err) {
      console.log(JSON.stringify(err));
      message.error("lỗi load tabs", 3);
    }
  };
  useEffect(() => {
    const renderTabs = async () => {
      try {
        const res = await request.get("Khoa");
        Khoa.current = res[0].ma;
        renderMon(Khoa.current);
        setTabs(() => {
          return res.map((item, index) => {
            return { label: item.ten, key: item.ma };
          });
        });
      } catch (err) {
        console.log(JSON.stringify(err));
        message.error("lỗi load tabs", 3);
      }
    };
    renderTabs();
  }, []);
  const handleTabChange = async (value) => {
    Khoa.current = value;
    renderMon(value);
  };
  return (
    <div className={cx("wrapper")}>
      <div style={{ display: "flex", gap: "2em"}}>
        <div className={cx("tabs")}>
          <Tabs
            items={tabs}
            tabPosition="right"
            onChange={handleTabChange}
            style={{ height: "600px" }}
          />
        </div>
        <div className={cx("list-mon-khoa")} ref={drop}>
          {loading && <LoaderLocal />}
          {listMon.length === 0 && <NoData />}
          <Search
            setList={setListMon}
            link={`MonhocPhan/findByname/${Khoa.current}/`}
            renderNull={() => renderMon(Khoa.current)}
          />
          <div className={cx("wrapper-list")}>
            {listMon.map((item, index) => {
              return (
                <MonItem
                  item={[
                    item.mahocphanNavigation.ma,
                    item.mahocphanNavigation.tenhocphan,
                  ]}
                  isTab={[true, item.id]}
                  render={() => renderMon(Khoa.current)}
                />
              );
            })}
          </div>
          <div className={cx("cover", { "drop-hover": isOver })}>
            <p>Thả mục vào đây !!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxKhoa;
