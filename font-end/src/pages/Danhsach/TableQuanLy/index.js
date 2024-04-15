import { Button, Input, Popconfirm, Table, message } from "antd";
import { useEffect, useRef, useState } from "react";
import * as utill from "../../../Util";
import * as req from "../../../ApiService";
import { useSelector } from "react-redux";
import Loader from "../../../Component/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './style.scss';
import { faArrowsRotate, faBan, faCheckDouble, faCircleXmark, faClone, faWrench } from "@fortawesome/free-solid-svg-icons";


function TableQuanLy({ render }) {
  const dataSource = useSelector((state) => state.global.danhsachFiles);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  useEffect(() => {
    render();
  }, []);
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
      title: "Chức năng",
      dataIndex: "chucnang",
      render: (text, record) => (
        <>
          {record.duyet === 0 ? (
            <>
              <Button
                onClick={() => {
                  handleDuyet({ objIte: [record], duyet: 1 });
                }}
                style={{ background: "#8CF22A", color: "#fff" }}
                icon={<FontAwesomeIcon icon={faCheckDouble} />}
              >
                Duyệt
              </Button>
              <Popconfirm
                title="Không duyệt"
                description={
                  <>
                    <span>Lý do: </span>{" "}
                    <Input
                      allowClear
                      onChange={(e) =>
                        setSuaLyDo((prev) => ({
                          ...prev,
                          noidung: e.target.value,
                          idFiles: record.id,
                        }))
                      }
                    />
                  </>
                }
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  handleDuyet({ objIte: [record], duyet: 2 });
                  handleThemLyDo();
                }}
              >
                <Button
                  style={{ background: "#F8365B", color: "#fff" }}
                  icon={<FontAwesomeIcon icon={faBan} />}
                >
                  Không duyệt
                </Button>
              </Popconfirm>
            </>
          ) : (
            <p>Đã kiểm tra !!</p>
          )}
        </>
      ),
      fixed: "right",
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [loading, setLoading] = useState(false);
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    // Handle row selection change
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRow((prev) => {
      return [...selectedRows];
    });
  };
  const onSelectAll = (selected, selectedRows, changeRows) => {
    if (selected) {
      setSelectedRowKeys(selectedRows.map((row) => row.key));
    } else {
      setSelectedRowKeys([]);
    }
    setSelectedRow(selectedRows);
  };
  const handleDuyet = async ({ objIte = [], duyet = 1 }) => {
    try {
      var data = [];
      setLoading(true);
      if (objIte.length > 0) {
        data = objIte.map((ite) => {
          return { ...ite, duyet: duyet };
        });
      } else {
        data = selectedRow.map((ite) => {
          return { ...ite, duyet: duyet };
        });
      }
      const res = await req.put("Files/ckfiles", data);
      setLoading(false);
      setSelectedRowKeys([]);
      setSelectedRow([]);
      render();
      message.success(res, 3);
    } catch (err) {
      console.log(err.message);
      message.error("có lỗi !!", 4);
    }
  };
  const [SuaLyDo, setSuaLyDo] = useState({
    idFiles: -1,
    noidung:""
  });
  const handleDoubleClickSuaLyDo = (record) => {
    setSuaLyDo((prev) => ({
      ...prev,
      idFiles: record.id,
      id: record.lydo[0].id,
      noidung: record.lydo[0].noidung,
    }));
  };
  const handleChageNoiDung = (e) => {
    setSuaLyDo((prev) => ({
      ...prev,
      noidung: e.target.value,
    }));
  };
  const handleHuySuaNoiDung = () => {
    setSuaLyDo((prev) => ({
      ...prev,
      idFiles: -1,
    }));
  };
  const handleThemLyDo = async () => {
    try {
      if (SuaLyDo.noidung.trim() === "") {
        return;
      }
      const rep = await req.post("LyDo", SuaLyDo);
      setSuaLyDo({
        idFiles: -1,
        noidung:""
      });
      render();
      message.success(rep, 3);
    } catch (e) {
      console.log(e);
      message.error("có lỗi !!", 3);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSuaNoiDung();
    }
  };
  const handleXoaLyDo = async value => {
    try {
      const rep = await req.del("LyDo/"+value);
      setSuaLyDo({
        idFiles: -1,
        noidung:""
      });
      render();
      message.success(rep, 3);
    } catch (e) {
      console.log(e);
      message.error("có lỗi !!", 3);
    }
  }
  const handleSuaNoiDung = async (record) => {
    try {
      if (SuaLyDo.noidung.trim() === "") {
        message.warning("dữ liệu trống !", 3)
        return;
      }
      const rep = await req.put("LyDo", SuaLyDo);
      setSuaLyDo({
        idFiles: -1,
        noidung:""
      });
      render();
      message.success(rep, 3);
    } catch (e) {
      console.log(e);
      message.error("có lỗi !!", 3);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {selectedRowKeys.length !== 0 && (
        <>
          <Button
            style={{ background: "#8CF22A", color: "#fff" }}
            onClick={handleDuyet}
            icon={<FontAwesomeIcon icon={faCheckDouble} />}
          >
            Duyệt
          </Button>
          <Button
            style={{ background: "#F8365B", color: "#fff" }}
            onClick={() => handleDuyet({ duyet: 2 })}
            icon={<FontAwesomeIcon icon={faBan} />}
          >
            Không duyệt
          </Button>
          <Button
            style={{ background: "#FFBA14", color: "#fff" }}
            onClick={() => handleDuyet({ duyet: 0 })}
            icon={<FontAwesomeIcon icon={faArrowsRotate} />}
          >
            Làm mới
          </Button>
        </>
      )}
      <Table
        scroll={{ x: true }}
        expandable={{
          expandedRowRender: (record) => {
            if (record.lydo.length !== 0) {
              let idLyDo = record.lydo[0].idFiles;
              if (idLyDo === SuaLyDo.idFiles) {
                return (
                  <div onClick={(e) => e.preventDefault()}>
                    <strong>Lý do:</strong>{" "}
                    <Input
                      onKeyDown={handleKeyDown}
                      onClick={(e) => e.stopPropagation()}
                      allowClear
                      style={{ color: "#F6BA09", width: "300px" }}
                      value={SuaLyDo.noidung}
                      onChange={handleChageNoiDung}
                    />{" "}
                    <Button onClick={() => handleSuaNoiDung(record)} type="primary" icon={<FontAwesomeIcon icon={faWrench} />} style={{background:"#FCBC1A"}}>
                      Sửa
                    </Button>
                    <Button onClick={handleHuySuaNoiDung} type="primary" icon={<FontAwesomeIcon icon={faClone} />} style={{background:"#9C9795", marginLeft:5}}  >Hủy</Button>{" "}
                  </div>
                );
              }
            }
            return (
              <div>
                <strong>Lý do:</strong>
                <div className="text__lydo">
                  <span
                    onDoubleClick={() => handleDoubleClickSuaLyDo(record)}
                    style={{ color: "#F6BA09" }}
                  >{` ${record.lydo[0].noidung}`}
                  </span>
                  <Popconfirm
                    title="Xác nhận xóa !!"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleXoaLyDo(record.lydo[0].id)}
                  ><FontAwesomeIcon icon={faCircleXmark} className="btn__xoa-lydo"/></Popconfirm>
                </div>
              </div>
            );
          },
          rowExpandable: (record) => record.lydo.length !== 0,
        }}
        pagination={{
          total: dataSource.length ,
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: onSelectChange,
          onSelectAll: onSelectAll,
          onSelect: (record) => {
            console.log("Bản ghi -------", record);
          },
          selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
        }}
        columns={column}
        dataSource={dataSource}
      />
    </div>
  );
}

export default TableQuanLy;
