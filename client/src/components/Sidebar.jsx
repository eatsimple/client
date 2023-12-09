import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Tambahkan ini
import { MdOutlineDashboard, MdAccountCircle, MdAnalytics, MdOutlineSettings, MdLogout } from 'react-icons/md';
import { BsChevronDown, BsChatLeftText, BsCalendarCheck, BsFiles, BsServer } from 'react-icons/bs';
import { FiAlignJustify } from 'react-icons/fi';
import { AiOutlineSetting } from 'react-icons/ai';
import { MdPowerSettingsNew } from 'react-icons/md';
import { BiHelpCircle } from 'react-icons/bi';
import { SiCoinmarketcap } from 'react-icons/si';
import { CiMoneyCheck1 } from 'react-icons/ci';
import { LiaSalesforce, LiaSitemapSolid } from 'react-icons/lia';

const Menus = [
  { title: 'Dashboard', src: 'Chart_fill', icon: <MdOutlineDashboard />, path: '/dashboard' }, // Tambahkan path
  { title: 'Inbox', src: 'Chat', icon: <BsChatLeftText />, path: '/inbox' }, // Tambahkan path
  // ... (menu lainnya)
  {
    title: 'Marketing',
    src: 'Marketing',
    icon: <SiCoinmarketcap />,
    subMenus: [
      {
        title: 'Kumpulan Modul',
        src: '/modulmarketing',
        cName: 'sub-nav',
      },
      {
        title: 'Video Pembelajaran',
        src: '/videomarketing',
        cName: 'sub-nav',
      },
      {
        title: 'Tools Keren',
        src: '/toolmarketing',
      },
      {
        title: 'Link Tertuju',
        src: '/linkmarketing',
      },
    ],
  },
  {
    title: 'Sales',
    src: 'Sales',
    icon: <LiaSalesforce />,
    subMenus: [
      {
        title: 'Kumpulan Modul',
        src: '/modulsales',
        cName: 'sub-nav',
      },
      {
        title: 'Video Pembelajaran',
        src: '/videosales',
        cName: 'sub-nav',
      },
      {
        title: 'Tools Keren',
        src: '/toolsales',
      },
      {
        title: 'Link Tertuju',
        src: '/linksales',
      },
    ],
  },
  {
    title: 'Keuangan',
    src: 'Keuangan',
    icon: <CiMoneyCheck1 />,
    subMenus: [
      {
        title: 'Kumpulan Modul',
        src: '/modulkeuangan',
        cName: 'sub-nav',
      },
      {
        title: 'Video Pembelajaran',
        src: '/videokeuangan',
        cName: 'sub-nav',
      },
      {
        title: 'Tools Keren',
        src: '/toolkeuangan',
      },
      {
        title: 'Link Tertuju',
        src: '/linkkeuangan',
      },
    ],
  },
  {
    title: 'Logistik',
    src: 'Logistik',
    icon: <LiaSitemapSolid />,
    subMenus: [
      {
        title: 'Kumpulan Modul',
        src: '/modullogistik',
        cName: 'sub-nav',
      },
      {
        title: 'Video Pembelajaran',
        src: '/videologistik',
        cName: 'sub-nav',
      },
      {
        title: 'Tools Keren',
        src: '/toollogistik',
      },
      {
        title: 'Link Tertuju',
        src: '/linklogistik',
      },
    ],
  },
  { title: 'Settings', src: 'Chat', icon: <AiOutlineSetting />, path: '/setting' },
  { title: 'Help & Support', src: 'Chat', icon: <BiHelpCircle />, path: '/support' },
  // { title: 'Logout', src: 'Chat', icon: <MdPowerSettingsNew />, path: '/logout' },
  // Tambahkan path
  // ... (menu lainnya)
];

const Sidebar = () => {
  const [open, setOpen] = useState(true); // state untuk buka tutup sidebar
  const [subMenuOpen, setSubMenuOpen] = useState({}); // State untuk mengelola status submenu

  const toggleSidebar = () => {
    setOpen(!open);
  };

  // Fungsi untuk mengatur status submenu
  const toggleSubMenu = (menuTitle) => {
    // menuTitle: 1 menu yang diklik
    setSubMenuOpen((prevState) => ({
      // prevState: menyimpan semua menu
      ...prevState,
      [menuTitle]: !prevState[menuTitle],
    }));
  };

  return (
    <div className="h-screen flex items-end justify-end">
      <button className="fixed z-90 bottom-6 right-6 bg-orange-600 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-orange-700 duration-500" onClick={toggleSidebar}>
        {/* ... (tombol) */} <FiAlignJustify />
      </button>

      <div className={` ${open ? 'slide-in ' : 'slide-out'} bg-orange-600 h-screen relative duration-500`}>
        <div className="justify-center mt-3">
          <h1 className={`text-white italic font-medium text-2xl text-center duration-200 ${!open && 'invisible'}`}>
            <div className=" flex flex-col cursor-pointer">
              <span className=" text-white">E-Learning</span>
              <span className=" text-white italic font-bold underline">AdyWater</span>
            </div>
          </h1>
        </div>

        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <React.Fragment key={index}>
              <NavLink to={Menu.path} className={`flex rounded-md p-2 cursor-pointer hover:bg-yellow-400 text-white text-sm items-center gap-x-4 ${Menu.gap ? 'mt-9' : 'mt-2'}`}>
                {Menu.icon ? Menu.icon : <MdOutlineDashboard />}
                <div
                  className="flex-1"
                  onClick={() => Menu.subMenus && toggleSubMenu(Menu.title)} // Toggle submenu saat klik
                >
                  {Menu.title}
                </div>
                {Menu.subMenus && <BsChevronDown onClick={() => toggleSubMenu(Menu.title)} className={`${subMenuOpen[Menu.title] && 'rotate-180'}`} />}
              </NavLink>
              {Menu.subMenus && subMenuOpen[Menu.title] && open && (
                <ul>
                  {Menu.subMenus.map((subMenuItem, idx) => (
                    <li key={idx} className="flex px-5 cursor-pointer text-center text-sm text-gray-200 py-1">
                      <NavLink to={subMenuItem.src} key={idx}>
                        {subMenuItem.title}
                      </NavLink>{' '}
                      {/* Tambahkan key prop di sini */}
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
