import { useSelector } from "react-redux";
import "./ThemProvider.scss";
import { ConfigProvider, theme } from "antd";

function ThemProvider({ children }) {
  const themes = useSelector((state) => state.global.theme);
  if(themes){
    document.body.style.background = "#7F7F7F"
  }else{
    document.body.style.background = "#EBEBEB"
  }
  return (
    <div className={themes ? "dark" : ""}>
      <ConfigProvider theme={{ algorithm: themes ? theme.darkAlgorithm : theme.defaultAlgorithm}}>{children}</ConfigProvider>
    </div>
  );
}

export default ThemProvider;
