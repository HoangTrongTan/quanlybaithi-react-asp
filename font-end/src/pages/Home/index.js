import { useState } from "react";
import style from "./home.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import * as actions from '../../Util'
const cx = classNames.bind(style);
const data = [
  {
    name:"– Ellen Goodman –",
    text:"Nếu ở Hoa Kỳ chỉ có một lời để lưu truyền từ thế hệ phụ huynh đến thế hệ của con em họ thì đó chỉ là một câu gồm hai chữ Tự tân. Và nếu ở mỗi thành phố có một ngôi đền dành cho sự tự tân, thì đó là ngôi trường học của nơi đó"
  },
  {
    name:"– Vijaya Lakshmi Pandit –",
    text:"Mục tiêu của giáo dục không phải là dạy cách kiếm sống hay cung cấp công cụ để đạt được sự giàu có, mà đó phải là con đường dẫn lối tâm hồn con người vươn đến cái chân và thực hành cái thiện."
  },
  {
    name:"– I.A. Gontcharov –",
    text:"Các bài giảng của giáo sư cho dù có đầy đủ, súc tích đến đâu, có chứa chan tình yêu tri thức đến đâu, thì về thực chất mà nói đó chẳng qua cũng vẫn chỉ là chương trình, là những lời chỉ dẫn tuần tự nhận thức của sinh viên. Người nào chỉ biết ngồi nghe giáo sư giảng chứ bản thân mình trong lòng không cảm thấy khát khao đọc sách, thì có thể nói tất cả những điều người ấy nghe giảng ở trường đại học cũng sẽ chỉ như một tòa nhà xây trên cát mà thôi"
  },
  {
    name:"William Arthur Ward",
    text:"The adventure of life is to learn. The purpose of life is to grow. The nature of life is to change. The challenge of life is to overcome. The essence of life is to care. The opportunity of like is to serve. The secret of life is to dare. The spice of life is to befriend. The beauty of life is to give."
  },
  {
    name:"- Ethel churchill, l.e. Landon.",
    text:"Sự ngu dốt, hơn hẳn cả sự ở không, mới là mẹ của tất cả các thói xấu. Ðịnh mệnh của các thế hệ tương lai nằm ở trong nền giáo dục khôn ngoan, một nền giáo dục cần phải phổ cập để có thể có ích lợi"
  },
  {
    name:"– Franklin –",
    text:" Học vấn do người siêng năng đạt được, tài sản do người tinh tế sở hữu, quyền lợi do người dũng cảm nắm giữ, thiên đường do người lương thiện xây dựng"
  },
  {
    name:"Oscar Wilde",
    text:"“Giáo dục là một điều đáng kính trọng, nhưng nên nhớ rằng đôi khi những điều được dạy là những cái không đáng biết.”"
  },
  {
    name:"– Ellen Goodman –",
    text:"Nếu ở Hoa Kỳ chỉ có một lời để lưu truyền từ thế hệ phụ huynh đến thế hệ của con em họ thì đó chỉ là một câu gồm hai chữ Tự tân. Và nếu ở mỗi thành phố có một ngôi đền dành cho sự tự tân, thì đó là ngôi trường học của nơi đó."
  },
  {
    name:"– Vijaya Lakshmi Pandit –",
    text:"Mục tiêu của giáo dục không phải là dạy cách kiếm sống hay cung cấp công cụ để đạt được sự giàu có, mà đó phải là con đường dẫn lối tâm hồn con người vươn đến cái chân và thực hành cái thiện."
  },
]
function Home() {
  
  const [descr, setDescr] = useState({
    author: "Immanuel Kant",
    text: "“Đọc sách không bằng suy ngẫm. Học trường không hơn được trường đời”",
  });
  const [thongdiep,setThongDiep] = useState(data)
  return (
    <div className={cx("wrapper")}>
      <h2>Nói về việc học</h2>
      <p>Học, học nữa, học mãi.</p>
      <div className={cx("imgs")}>
        <img
          onClick={() =>
            setDescr({
              author: "– Franklin –",
              text: "“Học vấn do người siêng năng đạt được, tài sản do người tinh tế sở hữu, quyền lợi do người dũng cảm nắm giữ, thiên đường do người lương thiện xây dựng.”",
            })
          }
          src="https://compote.slate.com/images/e3426f47-139d-4f15-a47a-b3017933c3bf.jpeg?width=1200&rect=1560x1040&offset=0x0"
        />
        <img
          onClick={() =>
            setDescr({
              author: "Immanuel Kant",
              text: "“Đọc sách không bằng suy ngẫm. Học trường không hơn được trường đời”",
            })
          }
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWPN0n275-tDmZUR2-Gm-ZRMOaBIffo7BXtA&usqp=CAU"
        />
        <img
          onClick={() =>
            setDescr({
              author: "Trang Tử",
              text: "“Đời sống có hạn mà sự học thì vô hạn.”",
            })
          }
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl5s9TItjpiYYkwWGq4MOp2CmMmBXhjoWxNqaxL3-2lOXfri1lpXbqRtXzYDueHlbyRv4&usqp=CAU"
        />
      </div>
      <h4 style={{ marginTop: 20 }}>{descr.author}</h4>
      <p>
        <i>{descr.text}</i>
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 100,
          position: "relative",
        }}
      >
        <div className={cx("box-img")}>
          <img src="https://eduma.vn/wp-content/themes/eduma/images/bg-newletter.png" />
          <p style={{ position: "absolute", top: 100, left: 30, right: 40 }}>
            Nhận thông tin mới nhất về các khóa học miễn phí và các chương trình
            đào tạo của SDU.VN!
          </p>
          <div className={cx('thongdiep')}>
              {
                thongdiep.map( (obj,i) => (
                  <button >{obj.name}</button>
                ) )
              }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
