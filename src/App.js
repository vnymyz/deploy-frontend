import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Kucing from "./pages/Kucing";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-redux";
import store from "./redux/store";
import AdminDashboard from "./admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import CreatePost from "./admin/CreatePost";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Layout from "./admin/global/Layout";
import EditPost from "./admin/EditPost";
import UserDashboard from "./user/UserDashboard";
import Singlepost from "./pages/Singlepost";
import Testimoni from "./pages/Testimoni";
import Tentang from "./pages/Tentang";
import Beranda from "./pages/Beranda";
// import Info from "./pages/Info";
// import untuk kategori
import CreateKategori from "./admin/CreateKategori";
import DeleteKategori from "./admin/DeleteKategori";
import ManageKategori from "./admin/ManageKategori";

// kalau mau buat pages baru bikin new file dulu
// abis itu bikin route path nya dan juga import file nya

//HOC
const AdminDashboardHOC = Layout(AdminDashboard);
const CreatePostHOC = Layout(CreatePost);
const EditPostHOC = Layout(EditPost);
const UserDashboardHOC = Layout(UserDashboard);
const DeleteKategoriHOC = Layout(DeleteKategori);
const ManageKategoriHOC = Layout(ManageKategori);

const App = () => {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <ProSidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Beranda />} />
              <Route path="/kucing" element={<Kucing />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/post/:id" element={<Singlepost />} />
              {/* <Route path="/info" element={<Info />} /> */}
              <Route path="/testimoni" element={<Testimoni />} />

              <Route path="/tentang" element={<Tentang />} />
              <Route path="*" element={<NotFound />} />

              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboardHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/post/create"
                element={
                  <AdminRoute>
                    <CreatePostHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/post/edit/:id"
                element={
                  <AdminRoute>
                    <EditPostHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/kategori/create"
                element={
                  <AdminRoute>
                    <ManageKategoriHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/kategori/delete"
                element={
                  <AdminRoute>
                    <DeleteKategoriHOC />
                  </AdminRoute>
                }
              />
              {/* user route for dashboard */}
              <Route
                path="/user/dashboard"
                element={
                  <UserRoute>
                    <UserDashboardHOC />
                  </UserRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider>
      </Provider>
    </>
  );
};

export default App;
