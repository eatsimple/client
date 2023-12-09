import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MarketingModul from './pages/marketing/MarketingModul';
import MarketingVideo from './pages/marketing/MarketingVideo';
import MarketingTool from './pages/marketing/MarketingTool';
import MarketingLink from './pages/marketing/MarketingLInk';
import EditModulMarketing from './edit/marketing/EditModulMarketing';
import TambahModulMarketing from './tambah/marketing/TambahModulMarketing';
import TambahVideoMarketing from './tambah/marketing/TambahVideoMarketing';
import EditVideoMarketing from './edit/marketing/EditVideoMarketing';
import TambahLinkMarketing from './tambah/marketing/TambahLinkMarketing';
import EditLinkMarketing from './edit/marketing/EditLinkMarketing';
import SalesModul from './pages/sales/SalesModul';
import SalesVideo from './pages/sales/SalesVideo';
import SalesLink from './pages/sales/SalesLink';
import SalesTool from './pages/sales/SalesTool';
import TambahLinkSales from './tambah/sales/TambahLinkSales';
import TambahModulSales from './tambah/sales/TambahModulSales';
import TambahVideoSales from './tambah/sales/TambahVideoSales';
import EditLinkSales from './edit/sales/EditLinkSales';
import EditModulSales from './edit/sales/EditModulSales';
import EditVideoSales from './edit/sales/EditVideoSales';
import KeuanganLink from './pages/keuangan/KeuanganLink';
import KeuanganModul from './pages/keuangan/KeuanganModul';
import KeuanganVideo from './pages/keuangan/KeuanganVideo';
import KeuanganTool from './pages/keuangan/KeuanganTool';
import TambahLinkKeuangan from './tambah/keuangan/TambahLinkKeuangan';
import TambahModulKeuangan from './tambah/keuangan/TambahModulKeuangan';
import TambahVideoKeuangan from './tambah/keuangan/TambahVideoKeuangan';
import EditLinkKeuangan from './edit/keuangan/EditLinkKeuangan';
import EditModulKeuangan from './edit/keuangan/EditModulKeuangan';
import EditVideoKeuangan from './edit/keuangan/EditVideoKeuangan';
import LogistikLink from './pages/logistik/LogistikLink';
import LogistikModul from './pages/logistik/LogistikModul';
import LogistikTool from './pages/logistik/LogistikTool';
import LogistikVideo from './pages/logistik/LogistikVideo';
import TambahLinkLogistik from './tambah/logistik/TambahLinkLogistik';
import TambahModulLogistik from './tambah/logistik/TambahModulLogistik';
import TambahVideoLogistik from './tambah/logistik/TambahVideoLogistik';
import EditLinkLogistik from './edit/logistik/EditLinkLogistik';
import EditModulLogistik from './edit/logistik/EditModulLogistik';
import EditVideoLogistik from './edit/logistik/EditVideoLogistik';
import Inbox from './pages/Inbox';
import Setting from './pages/Setting';
import LookProfile from './pages/LookProfile';
import Logout from './pages/Logout';
import HelpAndSupport from './pages/HelpAndSupport';
// import { useDispatch, useSelector } from 'react-redux';
// import { Me } from './features/authSlice';
import React, { useEffect } from 'react';

function App() {
  // const dispatch = useDispatch();
  // const { isError } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(Me());
  // }, [dispatch]);

  // if (isError) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route index path="/register" element={<Register />} />
        <Route index path="/logout" element={<Logout />} />
        <Route element={<Layout />}>
          {/* Ini yang di bawah adalah Outlet */}

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="setting" element={<Setting />} />
          <Route path="profile" element={<LookProfile />} />
          <Route path="support" element={<HelpAndSupport />} />

          {/* //! --Marketing */}
          {/* Ini Page */}
          <Route path="modulmarketing" element={<MarketingModul />} />
          <Route path="videomarketing" element={<MarketingVideo />} />
          <Route path="toolmarketing" element={<MarketingTool />} />
          <Route path="linkmarketing" element={<MarketingLink />} />

          {/* Ini Edit */}
          <Route path="modulmarketing/edit-modul/:id" element={<EditModulMarketing />} />
          <Route path="videomarketing/edit-video/:id" element={<EditVideoMarketing />} />
          <Route path="linkmarketing/edit-link/:id" element={<EditLinkMarketing />} />

          {/* Ini Tambah */}
          <Route path="modulmarketing/add-modul" element={<TambahModulMarketing />} />
          <Route path="videomarketing/add-video" element={<TambahVideoMarketing />} />
          <Route path="linkmarketing/add-link" element={<TambahLinkMarketing />} />
          {/* //! --Marketing */}

          {/* //! Sales */}
          {/* Ini Page */}
          <Route path="modulsales" element={<SalesModul />} />
          <Route path="videosales" element={<SalesVideo />} />
          <Route path="linksales" element={<SalesLink />} />
          <Route path="toolsales" element={<SalesTool />} />

          {/* Ini Tambah */}
          <Route path="linksales/add-link" element={<TambahLinkSales />} />
          <Route path="modulsales/add-modul" element={<TambahModulSales />} />
          <Route path="videosales/add-video" element={<TambahVideoSales />} />

          {/* Ini Edit */}
          <Route path="linksales/edit-link/:id" element={<EditLinkSales />} />
          <Route path="modulsales/edit-modul/:id" element={<EditModulSales />} />
          <Route path="videosales/edit-video/:id" element={<EditVideoSales />} />

          {/* //! Sales */}

          {/* //! --Keuangan */}
          {/* Ini Page */}
          <Route path="linkkeuangan" element={<KeuanganLink />} />
          <Route path="modulkeuangan" element={<KeuanganModul />} />
          <Route path="videokeuangan" element={<KeuanganVideo />} />
          <Route path="toolkeuangan" element={<KeuanganTool />} />

          {/* Ini Tambah */}
          <Route path="linkkeuangan/add-link" element={<TambahLinkKeuangan />} />
          <Route path="modulkeuangan/add-modul" element={<TambahModulKeuangan />} />
          <Route path="videokeuangan/add-video" element={<TambahVideoKeuangan />} />

          {/* Ini Edit */}
          <Route path="linkkeuangan/edit-link/:id" element={<EditLinkKeuangan />} />
          <Route path="modulkeuangan/edit-modul/:id" element={<EditModulKeuangan />} />
          <Route path="videokeuangan/edit-video/:id" element={<EditVideoKeuangan />} />

          {/* //! --Keuangan */}

          {/* //! Logistik */}
          {/* Ini Page */}
          <Route path="linklogistik" element={<LogistikLink />} />
          <Route path="modullogistik" element={<LogistikModul />} />
          <Route path="toollogistik" element={<LogistikTool />} />
          <Route path="videologistik" element={<LogistikVideo />} />

          {/* Ini Tambah */}
          <Route path="linklogistik/add-link" element={<TambahLinkLogistik />} />
          <Route path="modullogistik/add-modul" element={<TambahModulLogistik />} />
          <Route path="videologistik/add-video" element={<TambahVideoLogistik />} />

          {/* Ini Edit */}
          <Route path="linklogistik/edit-link/:id" element={<EditLinkLogistik />} />
          <Route path="modullogistik/edit-modul/:id" element={<EditModulLogistik />} />
          <Route path="videologistik/edit-video/:id" element={<EditVideoLogistik />} />

          {/* //! Logistik */}

          {/* // Ini yang di atas adalah Outlet */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
