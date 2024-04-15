import style from "./Khoa.module.scss";
import classNames from "classnames/bind";
import { Button, Modal, Popconfirm, Table, message } from "antd";
import * as request from "../../ApiService";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";
import "../../Component/StyleNotModule/index.scss";
import AddFixModal from "../KhoaLopMon/AddFixModal";
import * as utill from "../../Util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMonument, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import LoaderLocal from "../../Component/LoaderLocal";
import DelAlot from "../KhoaLopMon/DelAlot";
import { useSelector } from "react-redux";
import Renderaccount from "./Renderaccount";
const cx = classNames.bind(style);

function Khoa() {
  const dataRootFiles = useSelector((state) => state.global.AllRootFiles);
  const getDependsFiles = ({ ma = 0 }) => {
    const totalValue = dataRootFiles
      .map((current, i) => {
        if (current.makhoa === ma) {
          let value =
            "Còn Môn: " +
            current.mahocphanNavigation.tenhocphan +
            " Khóa: " +
            current.idkhoaDkNavigation.loai +
            " Lớp: " +
            current.lopNavigation.ten +
            " Giáo viên: " +
            current.taikhoan.tendangnhap;
          if (current.duyet !== 1) {
            if (current.duyet === 0) {
              value += " đang chờ duyệt !!\n";
            } else {
              value += " không được duyệt !!\n";
            }
          } else {
            return null;
          }
          return {
            value,
            duyet: current.duyet,
          };
        }
        return null;
      })
      .filter(Boolean);
    return totalValue;
  };
  const renderNotifiFile = (ma) => {
    var listFiles = getDependsFiles({ ma: ma });
    if (listFiles.length !== 0) {
      return listFiles.map((obj, i) => (
        <h5 style={{ color: obj.duyet === 2 ? "#F8365B" : "#1677FF" }} key={i}>
          {obj.value}
        </h5>
      ));
    } else {
      return "Xóa dữ liệu !";
    }
  };
  const columns = [
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
      ...utill.getColumnSearchProps("ten"),
    },
    {
      title: "Mã",
      dataIndex: "ma",
      key: "ma",
      ...utill.getColumnSearchProps("ma"),
    },
    {
      title: "Chức năng",
      dataIndex: "chucnang",
      render: (text, record) => (
        <span>
          <EditOutlined
            style={{ marginRight: 8 }}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Sẽ xóa các dữ liệu liên quan !!!"
            description={renderNotifiFile(record.ma)}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleDelete(record.ma);
            }}
            placement="topLeft"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
        </span>
      ),
    },
  ];
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [obj, setObj] = useState({});
  const handleEdit = (record) => {
    console.log("Edit clicked:", record);
    setObj(record);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await request.del("Khoa/" + id);
      render();
      setLoading(false);
      message.success(res, 3);
    } catch (err) {
      console.log(JSON.stringify(err));
      message.error("Có lỗi xảy ra", 3);
    }
  };
  const render = async () => {
    try {
      const res = await request.get("Khoa");
      const resData = res.map((obj, i) => ({ ...obj, key: i }));
      setDataSource(resData);
    } catch (err) {
      console.log(JSON.stringify(err));
      message.error("Có lỗi khi load dữ liệu !", 3);
    }
  };
  useEffect(() => {
    render();
  }, []);
  const hanleOpenModal = () => {
    setObj({});
    setOpen(true);
  };
  const handleCancelModal = () => setOpen(false);
  // biến chọn các checkbox -----------------------------------------------------------------
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows((prev) => {
      return [...selectedRows];
    });
  };
  const onSelectAll = (selected, selectedRows, changeRows) => {
    if (selected) {
      setSelectedRowKeys(selectedRows.map((prev) => prev.key));
    } else {
      setSelectedRowKeys([]);
    }
    setSelectedRows(selectedRows);
  };
  const handleDeleteAlot = async () => {
    try {
      setLoading(true);
      const data = selectedRows.map((obj) => {
        const ite = { ...obj };
        delete ite.key;
        delete ite.khoaDks;
        delete ite.taikhoans;
        return { ...ite };
      });
      console.log(data, "--------------------");
      const rep1 = await request.post("Khoa/delete-file", data);
      const rep2 = await request.post("Khoa/delete-dk-lop", data);

      console.log(rep1, rep2);
      message.success(rep1 + rep2, 10);
      setSelectedRowKeys([]);
      setLoading(false);
      render();
    } catch (e) {
      console.log(e);
      message.error("có lỗi", 3);
      setOpen(false);
    }
  };
  return (
    <div className={cx("wrapper")}>
      {loading && <LoaderLocal />}
      <div className={cx("list")}>
        <div className={cx("actions")}>
          <Button
            type="primary"
            onClick={hanleOpenModal}
            icon={<FontAwesomeIcon icon={faPenToSquare} />}
          >
            Thêm mới
          </Button>
          {selectedRows.length > 0 && (
            <DelAlot
              getDependsFiles={getDependsFiles}
              dataselect={selectedRows}
              handleDeleteXoa={handleDeleteAlot}
              khoa={true}
            />
          )}
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 10 }}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys,
            onChange: onSelectChange,
            onSelectAll: onSelectAll,
            selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
          }}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <div className={cx("wrapper-render")}>
                  <div className={cx("wrapper-khoadk")}>
                    <h5 className={cx('title')}>Khóa</h5>
                    <div className={cx("list")}>
                      {record.khoaDks.map((obj, i) => (
                        <p>khóa {obj.loai}</p>
                      ))}
                    </div>
                  </div>
                  <div className={cx("wrapper-account")}>
                    <Renderaccount arr={record.taikhoans} />
                  </div>
                </div>
              );
            },
            rowExpandable: (record) => record.khoaDks.length !== 0,
          }}
        />
      </div>

      <Modal
        title={Object.keys(obj).length === 0 ? "Thêm Mới" : "Sửa thông tin"}
        open={open}
        onCancel={handleCancelModal}
        footer={false}
      >
        <AddFixModal
          arrField={[
            {
              label: "Tên",
              field: "ten",
              icon: <FontAwesomeIcon icon={faMonument} />,
            },
            {
              label: "Mã",
              field: "ma",
              icon: <BarcodeOutlined />,
            },
          ]}
          obj={obj}
          setOpen={setOpen}
          render={render}
          links={{ add: "Khoa", fix: "Khoa" }}
        />
      </Modal>
    </div>
  );
}

export default Khoa;
