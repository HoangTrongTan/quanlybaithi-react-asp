import { Input, message } from "antd";
import style from "./Search.module.scss";
import classNames from "classnames/bind";
import { SearchOutlined } from "@ant-design/icons";
import * as request from "../../../ApiService";
import UseDebounce from "../../../Hooks/useDebounce";
import { useEffect, useState } from "react";
import LoaderLocal from "../../../Component/LoaderLocal";
const cx = classNames.bind(style);
function Search({ setList, link, renderNull }) {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value.trim());
  };
  const debounceValue = UseDebounce(search, 700);

  useEffect(() => {
    if (!debounceValue) {
      renderNull();
      return;
    }
    const render = async () => {
      try {
        setLoading(true);
        const res = await request.get(link + debounceValue);
        setLoading(false);
        setList(res);
      } catch (err) {
        console.log(JSON.stringify(err));
        message.error("Lỗi thay đổi dữ liệu các tabs", 3);
      }
    };
    render();
  }, [debounceValue]);
  return (
    <>
      {
        loading && <LoaderLocal />
      }
      <div className={cx("wrapper")}>
        <Input
          placeholder="tìm kiếm...."
          allowClear
          suffix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
          onChange={handleSearch}
        />
      </div>
    </>
  );
}

export default Search;
