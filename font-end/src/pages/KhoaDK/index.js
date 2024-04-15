import { Button, Modal, Popconfirm, Table, message } from "antd";
import style from "./KhoaDK.module.scss";
import classNames from "classnames/bind";
import * as request from "../../ApiService";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import AddFixModal from "../KhoaLopMon/AddFixModal";
import * as utill from "../../Util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import DelAlot from "../KhoaLopMon/DelAlot";
import { useSelector } from "react-redux";

const cx = classNames.bind(style);
function KhoaDK() {
  const dataRootFiles = useSelector( state => state.global.AllRootFiles);
  const getDependsFiles = ({ma}) => {
    const totalValue = dataRootFiles.map((current, i) => {
      if (current.idkhoaDkNavigation.id === ma) {
        let value = "Còn Môn: " + current.mahocphanNavigation.tenhocphan + " Khóa: " + current.idkhoaDkNavigation.loai+ ", Lớp: "+ current.idkhoaDkNavigation.lops[0].ten + " Giáo viên: " + current.taikhoan.tendangnhap;
        if (current.duyet !== 1) {
          if (current.duyet === 0) {
            value += " đang chờ duyệt !!\n";
          } else {
            value += " không được duyệt !!\n";
          }
        }else{
          return null
        }
        return {
          value,
          duyet:current.duyet
        };
      }
      return null; 
    }).filter(Boolean);
    return totalValue;
  }
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
      title: "Khóa",
      dataIndex: "loai",
      key: "loai",
      ...utill.getColumnSearchProps("loai"),
    },
    {
      title: "Khoa",
      dataIndex: ["Khoa", "ten"],
      key: "ten",
      ...utill.getColumnSearchProps(["Khoa", "ten"]),
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
            description={renderNotifiFile(record.id)}
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
  const [khoaData, setKhoaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [obj, setObj] = useState({});
  useEffect(() => {
    const getAllKhoa = async () => {
      try {
        const res = await request.get("Khoa");
        const khoaDkSelect = res.map((obj) => {
          return {
            value: obj.ma,
            label: obj.ten,
          };
        });
        setKhoaData(khoaDkSelect);
      } catch (err) {
        console.log(JSON.stringify(err));
        message.error("lỗi gọi data khoa", 3);
      }
    };
    getAllKhoa();
  }, []);
  const handleEdit = (record) => {
    console.log("Edit clicked:", record);
    setObj(record);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      const res = await request.del("KhoaDks/" + id);
      render();
      message.success(res, 3);
    } catch (err) {
      console.log(JSON.stringify(err));
      message.error("Có lỗi xảy ra", 3);
    }
  };
  const render = async () => {
    try {
      const res = await request.get("KhoaDks");
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

  const [page,setPage] = useState({
    current: 1,
    pageSize: 10
  });
  const handleChangePage = (page,pageSize) => {
    setPage(prev => ({
      ...prev,
      current: page,
      pageSize: pageSize
    }))
  }
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
        delete ite.Khoa;
        delete ite.filesUps;
        delete ite.lops;
        return { ...ite };
      });
      console.log(data, "=====================");
      const rep1 = await request.post("KhoaDks/del-khoa-dk-file", data);
      const rep2 = await request.post("KhoaDks/del-khoa-dk-lop", data);


      message.success(rep1 + rep2, 10);
      setOpen(false);
      setLoading(false);
      render();
    } catch (e) {
      console.log(e);
      message.error("có lỗi", 3);
      setOpen(false);
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
          {/* "KhoaDks/del-khoa-dk-lop" */}
          {selectedRows.length > 0 && (
            <DelAlot dataselect={selectedRows}  getDependsFiles={getDependsFiles}  handleDeleteXoa={handleDeleteXoa}/>
          )}
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            total: dataSource.length,
            current: page.current,
            pageSize: page.pageSize,
            onChange: handleChangePage
          }}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys,
            onChange: onSelectChange,
            onSelectAll: onSelectAll,
            selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
          }}
          expandable={{
            expandedRowRender: (record) =>  (
              <div className={cx('list_class')}>
                <p>lớp phụ thuộc: </p>
                <div className={cx('list_box')}>
                  {
                    record.lops.map( (obj,i) => (
                        <h5 className={cx('item__class')} key={i}>{obj.ten}</h5>
                    ) )
                  }
                </div>
              </div>
            ),
          rowExpandable: (record) => record.lops.length !== 0,
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
              label: "Khóa",
              field: "loai",
              type: "number",
              icon: <ReadOutlined />,
            },
          ]}
          obj={obj}
          setOpen={setOpen}
          render={render}
          dataSelect={khoaData}
          fieldSelect={{
            values: "ma",
            label: "Khoa",
            icons: <FontAwesomeIcon icon={faBuilding} />,
          }} //gửi truowngf để gán giá trị cho select *chỉ khi sử dụng select
          links={{ add: "KhoaDks", fix: "KhoaDks" }}
          nameSelect={Object.keys(obj).length > 0 ? obj.Khoa.ten : ""}
        />
      </Modal>
    </div>
  );
}

export default KhoaDK;
