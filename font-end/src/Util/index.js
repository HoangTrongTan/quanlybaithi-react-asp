import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

const BackLogin = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  console.log("token ---------------------------", token);
  if (token === null) {
    navigate("/login");
  }
};
const getColumnSearchProps = (findKey) => ({
  filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
    return (
      <div style={{display:"flex", alignItems:"center" , gap:"1em", padding:10}}>
        <h4>Lọc: </h4>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search here ...."
          allowClear
          autoFocus
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value?[e.target.value]:[]);
            confirm( {closeDropdown: false} );
          }}
          onPressEnter={() => {
            confirm();
          }}
          onBlur={() => {
            confirm();
          }}
        />
      </div>
    );
  },
  filterIcon: (filtered) => (
    <SearchOutlined  />
  ),
  onFilter:(value,record) => {
    const columnValue = Array.isArray(findKey)
        ? findKey.reduce((acc, key) => (acc && acc[key]) || '', record)
        : record[findKey];
      return columnValue && String(columnValue).toLowerCase().includes(String(value).toLowerCase());
  },
  sorter: (a, b) => {
    if(Array.isArray(findKey)){
      var aa = getObjectValueByKeys(a, findKey);
      var bb = getObjectValueByKeys(b, findKey);
      return String(aa).localeCompare(String(bb));
    }
    console.log();
    return String(a[findKey]).localeCompare(String(b[findKey]));
  },
});
const getObjectValueByKeys = (object, keys) => {
  return keys.reduce((acc, key) => (acc && acc[key]) || undefined, object);
};
export {BackLogin ,getColumnSearchProps};