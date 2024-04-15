import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Popconfirm, Table, Tooltip, message } from "antd";
import style from "./Danhsach.module.scss";
import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as request from "../../ApiService";
import * as requestForm from "../../ApiService/formRequest";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import FormFix from "./FormFix";
import { setDanhSachFiles } from "../../StoreProvider/global";
import { useJwt } from "react-jwt";
import UpFiles from "../UpFiles";
import * as utill from "../../Util";
import TableQuanLy from "./TableQuanLy";
import LoaderLocal from "../../Component/LoaderLocal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(style);

const { confirm } = Modal;
function Danhsach() {
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const chucvu = sessionStorage.getItem("chucvu");
  const navigate = useNavigate();
  if (token === null) {
    navigate("/login");
  }
  const { decodedToken, isExpired } = useJwt(sessionStorage.getItem("token"));
  // chỉ để re-render
  const [fileState, setFileState] = useState({});

  const [fixDelAddModel, setFixDelAddModel] = useState([
    false,
    false,
    {},
    false,
  ]); //[0] là sửa [1] là xóa [2] gửi object sang để sửa [3] thêm
  const dataSource = useSelector((state) => state.global.danhsachFiles);
  const dispacth = useDispatch();
  const column = [
    {
      title: "Giáo viên",
      dataIndex: "giaovien",
      ...utill.getColumnSearchProps("giaovien"),
      fixed: "left",
    },
    {
      title: "Khoa",
      dataIndex: "khoa",
    },
    {
      title: "Khóa",
      dataIndex: "khoa_DK",
      sorter: (a, b) => {
        return String(a.khoa_DK).localeCompare(String(b.khoa_DK));
      },
    },
    {
      title: "Lớp",
      dataIndex: "lop",
    },
    {
      title: "Môn",
      dataIndex: "mon",
      ...utill.getColumnSearchProps("mon"),
    },
    {
      title: "File",
      dataIndex: "filesUp",
      render: (text, record) => (
        <a href={`https://localhost:7029/contents/${text}`}>
          <img
            src="https://images.sftcdn.net/images/t_app-icon-m/p/c3152528-96bf-11e6-b8e7-00163ed833e7/3833258526/winrar-64bit-WinRAR.png"
            alt={`${record}`}
            style={{ width: 50, height: 50 }}
          />
        </a>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "thoigian",
      ...utill.getColumnSearchProps("thoigian"),
    },
    {
      title: "Trạng thái",
      dataIndex: "chuoiduyet",
      ...utill.getColumnSearchProps("chuoiduyet"),
      render: (text, record) => {
        if (record.duyet === 1) {
          return (
            <span style={{ color: "green", fontWeight: "bolder" }}>
              {record.chuoiduyet}
            </span>
          );
        } else if (record.duyet === 2) {
          return (
            <span style={{ color: "red", fontWeight: "bolder" }}>
              {record.chuoiduyet}
            </span>
          );
        } else {
          return <span>{record.chuoiduyet}</span>;
        }
      },
    },
    {
      fixed: "right",
      title: "Chức năng",
      dataIndex: "chucnang",
      render: (text, record) => (
        <>
          {record.duyet === 1 ? (
            <p>File đã được xử lý</p>
          ) : (
            <span>
              <EditOutlined
                style={{ marginRight: 8 }}
                onClick={() => handleEdit(record)}
              />
              <Popconfirm
                title="Delete the task"
                description="Bạn có chắc chắn xóa tác vụ này không ?"
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
          )}
        </>
      ),
    },
  ];

  const handleEdit = (record) => {
    setFixDelAddModel((prev) => {
      prev[0] = true;
      prev[2] = record;
      prev[3] = false;
      return [...prev];
    });
  };
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await requestForm.del("Files/" + id);
      render();
      setLoading(false);
      message.success("xóa thành công !!", 3);
    } catch (err) {
      console.log(err);
      setLoading(false);
      message.error("xóa lỗi", 3);
    }
  };

  const render = async () => {
    if (chucvu === "admin") {
      const res = await request.get("Files");
      const resToData = res.map((obj) => ({ ...obj, key: obj.id }));
      console.log(resToData);
      dispacth(setDanhSachFiles(resToData));
    } else {
      const res = await request.get("Files/" + decodedToken.maUser);
      const resToData = res.map((obj, id) => ({ ...obj, key: id }));
      dispacth(setDanhSachFiles(resToData));
    }
  };

  useEffect(() => {
    if (decodedToken) {
      render();
      // cho cái state để set lại cho cái decodedToken có dữ liệu thôi
      setFileState(decodedToken);
    }
  }, [decodedToken]);
  useEffect(() => {
    if (decodedToken) {
      console.log(decodedToken, "decodedToken đây đây đây ...........");
      render();
    }
  }, [dataSource.length]);

  const pagination = {
    pageSize: 7,
  };
  const handleOpenFormAdd = () => {
    setFixDelAddModel((prev) => {
      prev[0] = false;
      prev[2] = {};
      prev[3] = true;
      return [...prev];
    });
  };
  const handleCancelModelAdd = () => {
    setFixDelAddModel((prev) => {
      prev[0] = false;
      prev[2] = {};
      prev[3] = false;
      return [...prev];
    });
  };
  const [chuY, setChuY] = useState(false);
  useEffect(() => {
    document.title = "Danh sách";
    const checkResize = (w) => {
      const _width = w;
      if (_width >= 768 && _width <= 1024) {
        setChuY(true);
      } else {
        setChuY(false);
      }
    };
    checkResize(window.innerWidth);
    const resize = (window.onresize = (e) => {
      checkResize(e.target.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <div className={cx("wrapper")}>
      {chuY && (
        <Tooltip title="shift + lăn chuột để xem" placement="top">
          <div className={cx("note-responsive")}>
            <p>* Chú ý</p>
          </div>
        </Tooltip>
      )}
      {loading && <LoaderLocal />}
      <div className={cx("content")}>
        {chucvu !== "admin" && (
          <Button
            type="primary"
            onClick={handleOpenFormAdd}
            icon={<FontAwesomeIcon icon={faUpload} />}
          >
            Thêm mới
          </Button>
        )}
        <FormFix state={[fixDelAddModel, setFixDelAddModel]} />
        {chucvu === "admin" ? (
          <TableQuanLy render={render} />
        ) : (
          <Table
            expandable={{
              expandedRowRender: (record) => (
                <div>
                  <strong>Lý do:</strong>
                  <span style={{ color: "#F6BA09" }}>
                    {` ${record.lydo[0].noidung}`}
                  </span>
                </div>
              ),
              rowExpandable: (record) => record.lydo.length !== 0,
            }}
            scroll={{ x: true }}
            columns={column}
            dataSource={dataSource}
            pagination={{
              total: dataSource.length,
              current: 1,
              pageSize: 10,
            }}
          />
        )}
      </div>
      <Modal
        title="Thêm Mới"
        open={fixDelAddModel[3]}
        onCancel={handleCancelModelAdd}
        footer={false}
      >
        {fixDelAddModel[3] && (
          <UpFiles
            state={[fixDelAddModel, setFixDelAddModel]}
            Objfiles={fixDelAddModel[2]}
          />
        )}
      </Modal>
    </div>
  );
}

export default Danhsach;
