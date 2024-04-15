import { useSelector } from "react-redux";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrinBeam, faFaceTired, faGrinBeam, faTired } from "@fortawesome/free-solid-svg-icons";

function ThongBaoUser() {
  const dataSource = useSelector((state) => state.global.danhsachFiles);
  console.log(dataSource);
  return (
    <div className="wrap__thongbao--user">
      <div className="thongbao__list">
        {dataSource.map((obj, i) => {
          if (obj.duyet !== 0) {
            return (
              <div key={i} className="thongbao__item" style={{ background:obj.duyet === 1?"#15C815" :"#F8365B" }}>
                <span>{`Lớp ${obj.lop}, khóa ${obj.khoa_DK}, môn ${obj.mon}`}</span>
                <span >
                  {obj.duyet === 1
                    ? " ,được phê duyệt !! "
                    :  " ,không được duyệt !! "}
                  {obj.duyet === 1 && <FontAwesomeIcon icon={faGrinBeam} style={{color:"#FEE2E7"}} /> }
                  {obj.duyet === 2 && <FontAwesomeIcon icon={faTired} style={{color:"#FEE2E7"}} />}
                </span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default ThongBaoUser;
