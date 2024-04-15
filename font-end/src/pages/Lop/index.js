import { Button, Modal, Popconfirm, Table, message } from "antd";
import style from "./Lop.module.scss";
import classNames from "classnames/bind";
import * as request from "../../ApiService";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  ReadOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";
import "../../Component/StyleNotModule/index.scss";
import AddFixModal from "../KhoaLopMon/AddFixModal";
import * as utill from "../../Util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMonument, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import LoaderLocal from "../../Component/LoaderLocal";
import { useSelector } from "react-redux";
import DelAlot from "../KhoaLopMon/DelAlot";
const cx = classNames.bind(style);

function Lop() {
  const dataRootFiles = useSelector((state) => state.global.AllRootFiles);
  // console.log(dataRootFiles);
  const getDependsFiles = ({ ma = 0 }) => {
    const totalValue = dataRootFiles
      .map((current, i) => {
        if (current.lopNavigation.id === ma) {
          let value =
            "Còn Môn: " +
            current.mahocphanNavigation.tenhocphan +
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
      title: "Khóa",
      dataIndex: ["khoaDkNavigation", "loai"],
      key: "loai",
      ...utill.getColumnSearchProps(["khoaDkNavigation", "loai"]),
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
            title="Dữ liệu liên quan sẽ bị xóa theo, bạn có chắc muốn xóa !"
            description={
              getDependsFiles({ ma: record.id }).length !== 0
                ? getDependsFiles({ ma: record.id }).map((obj, i) => (
                    <h5
                      style={{ color: obj.duyet === 2 ? "#F8365B" : "#1677FF" }}
                      key={i}
                    >
                      {obj.value}
                    </h5>
                  ))
                : "Xóa dữ liệu !"
            }
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleDelete(record.id);
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

  const [khoaDKData, setKhoaDKData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [obj, setObj] = useState({});
  //taoj select rooif guwir sang AddFixModal
  useEffect(() => {
    const getAllKhoaDk = async () => {
      try {
        const res = await request.get("KhoaDks");
        const khoaDkSelect = res.map((obj) => {
          return {
            value: obj.id,
            label: `Khóa ${obj.loai} - ${obj.Khoa.ten}`,
          };
        });
        setKhoaDKData(khoaDkSelect);
      } catch (err) {
        console.log(JSON.stringify(err));
        message.error("lỗi gọi data khoa", 3);
      }
    };
    getAllKhoaDk();
  }, []);

  const handleEdit = (record) => {
    console.log("Edit clicked:", record);
    setObj(record);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await request.del("Lop/" + id);
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
      const res = await request.get("Lop/getWithKhoadk");
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
  const [page, setPage] = useState({
    current: 1,
    pageSize: 10,
  });
  const handleChangePage = (page, pageSize) => {
    setPage((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }));
  };
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
  const handleDeleteXoa = async () => {
    try {
      setLoading(true);
      const data = selectedRows.map((obj) => {
        const ite = { ...obj };
        delete ite.key;
        delete ite.khoaDkNavigation;
        delete ite.filesUps;
        delete ite.taikhoans;
        return { ...ite };
      });
      
      const rep = await request.post("Lop/delclasses", data);

      console.log(rep);
      message.success(rep, 10);
      setOpen(false);
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
              handleDeleteXoa={handleDeleteXoa}
            />
          )}
        </div>
        <Table
          style={{ width: "100%" }}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            total: dataSource.length,
            current: page.current,
            pageSize: page.pageSize,
            onChange: handleChangePage,
          }}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys,
            onChange: onSelectChange,
            onSelectAll: onSelectAll,
            selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
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
          dataSelect={khoaDKData}
          fieldSelect={{
            values: "khoaDk",
            label: "Khóa",
            icons: <ReadOutlined />,
          }} //gửi truowngf để gán giá trị cho select *chỉ khi sử dụng select
          links={{ add: "Lop", fix: "Lop" }}
          nameSelect={
            Object.keys(obj).length > 0
              ? `Khóa ${obj.khoaDkNavigation.loai} - ${obj.khoaDkNavigation.Khoa.ten}`
              : ""
          }
        />
      </Modal>
    </div>
  );
}

export default Lop;
