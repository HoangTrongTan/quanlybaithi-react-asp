import style from "./Mon.module.scss";
import classNames from "classnames/bind";
import { Button, Modal, Popconfirm, Table, message } from "antd";
import * as request from "../../ApiService";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  BarcodeOutlined,
  TagOutlined,
} from "@ant-design/icons";
import AddFixModal from "../KhoaLopMon/AddFixModal";
import * as utill from "../../Util";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);
function Mon() {
  const columns = [
    {
      title: "Tên",
      dataIndex: "tenhocphan",
      key: "tenhocphan",
      ...utill.getColumnSearchProps("tenhocphan"),
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
            title={"Xóa " + record.tenhocphan + " ??"}
            description="Ấn ** Có ** đồng nghĩa môn này sẽ bị loại bỏ khỏi các khoa !! ?"
            okText="Có"
            cancelText="Không"
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
      const res = await request.del("MonHocKhoa/" + id);
      render();
      message.success(res, 3);
    } catch (err) {
      console.log(JSON.stringify(err));
      message.error("Có lỗi xảy ra", 3);
    }
  };
  const render = async () => {
    try {
      const res = await request.get("MonHocKhoa");
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
  // biến phân trang USESTATE ------------------------------------------------------------
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
  const handleDelALot = async () => {

    try {
      // Xóa trường key 
      const dataRowsSelected = selectedRows.map( obj => {
        var newIte = {...obj};
        delete newIte.key;
        delete newIte.monhockhoas;
        return newIte;
  
      } )
      console.log(dataRowsSelected);
      console.log(JSON.stringify(dataRowsSelected));
      const res = await request.put("MonHocKhoa/delalot", dataRowsSelected);

      render();
      message.success(res, 3);
    } catch (err) {
      console.log(err);
      message.error("Có lỗi xảy ra", 3);
    }
  }
  return (
    <div className={cx("wrapper")}>
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
            <Popconfirm
              title={"Xóa những mục này ??"}
              description={" Ấn *Có* sẽ xóa môn này ra khỏi các khoa khác"}
              okText="Có"
              cancelText="Không"
              onConfirm={handleDelALot}
              placement="topLeft"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button
                style={{background: "#0af094"}}
                type="primary"
                icon={<FontAwesomeIcon icon={faEraser} />}
              >
                Xóa
              </Button>
            </Popconfirm>
          )}
        </div>
        <Table
          expandable={{
            expandedRowRender: (record) => {
              if (record.monhockhoas.length !== 0) {
                return (
                  <div className={cx("mon-by-khoa")}>
                    <div>
                      <p>Nằm trong các khoa: </p>
                    </div>
                    <div className={cx("list-khoa")}>
                      {record.monhockhoas.map((ite, i) => (
                        <p key={i}>{ite._Khoa.ten}</p>
                      ))}
                    </div>
                  </div>
                );
              }
            },
            rowExpandable: (record) => record.monhockhoas.length !== 0,
            defaultExpandAllRows: false,
          }}
          pagination={{
            total: dataSource.length,
            current: page.current,
            pageSize: page.pageSize,
            onChange: handleChangePage,
          }}
          columns={columns}
          dataSource={dataSource}
          rowSelection={{
            type: "checkbox",
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
              label: "Mã",
              field: "ma",
              icon: <BarcodeOutlined />,
            },
            {
              label: "Tên Học Phần",
              field: "tenhocphan",
              icon: <TagOutlined />,
            },
          ]}
          obj={obj}
          setOpen={setOpen}
          render={render}
          links={{ add: "MonHocKhoa", fix: "MonHocKhoa" }}
        />
      </Modal>
    </div>
  );
}

export default Mon;
