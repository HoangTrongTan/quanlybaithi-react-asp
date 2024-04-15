import Home from "../pages/Home";
import Danhsach from "../pages/Danhsach";
import UpFiles from "../pages/UpFiles";
import {routespath} from './rouconfig.js'
import LayoutUser from "../Component/Layout/LayoutUser/index.js";
import Login from "../pages/Login/index.js";
import KhoaLopMon from "../pages/KhoaLopMon/index.js";
import MonhocWithKhoa from "../pages/MonhocWithKhoa/index.js";

const publicRoutes = [
    { path:routespath.admin.home, component:Danhsach },
    { path:routespath.admin.upload, component:UpFiles },
    { path:routespath.user.home , component:Home, layout:LayoutUser},
    { path:routespath.login.def , component:Login, layout:null},
    { path:routespath.admin.qltt , component:KhoaLopMon },
    { path:routespath.admin.mhk , component:MonhocWithKhoa },

];
export { publicRoutes }