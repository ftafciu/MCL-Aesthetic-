import React, { useEffect, useRef, useState } from 'react';
import "./SiveNav.css"
import { ConfigProvider, Layout, Menu, MenuProps, SiderProps } from 'antd';
import {
  BookOutlined,
  CalendarOutlined,
  DollarOutlined,
  FieldTimeOutlined,
  MenuOutlined,
  PieChartOutlined,
  ScheduleOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Logo } from '../../components';
import { Link, useLocation } from 'react-router-dom';
import {
  PATH_DASHBOARD_ADMIN,
  PATH_CLIENTS,
  PATH_LANDING,
} from '../../constants';
import { COLOR } from '../../App.tsx';
import { PATH_EXPENSES, PATH_SESSION } from '../../constants/routes.ts';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuProps['items'] = [
  getItem(<Link to={PATH_DASHBOARD_ADMIN.root}>Dashboard</Link>, 'dashboard', <PieChartOutlined />),
  getItem('Clients', 'client', <UserSwitchOutlined />, [
    getItem(<Link to={PATH_CLIENTS.root}>Clients list</Link>, 'client', <MenuOutlined />),
    getItem(<Link to={PATH_CLIENTS.create}>Create client</Link>, 'create', <UserAddOutlined />)
  ]),
  getItem('Sessions', 'sessions', <FieldTimeOutlined />, [
    getItem(<Link to={PATH_SESSION.root}>Sessions list</Link>, 'sessions', <CalendarOutlined />),
    getItem(<Link to={PATH_SESSION.create}>Create session</Link>, 'create-session', <ScheduleOutlined />),
    getItem(<Link to={PATH_SESSION.finished}>Finished session</Link>, 'finished-session', <BookOutlined />)
  ]),
  getItem(<Link to={PATH_EXPENSES.root}>Expenses</Link>, 'expenses', <DollarOutlined />),

];

const rootSubmenuKeys = ['dashboards', 'corporate', 'user-profile'];

type SideNavProps = SiderProps;

const SideNav = ({ ...others }: SideNavProps) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();

  const hasChildren = (
    item: MenuItem | null | undefined
  ): item is MenuItem & { children: MenuItem[] } => {
    return !!item && 'children' in item && Array.isArray(item.children);
  };

  const parentKeys = (items ?? [])
    .filter((item): item is MenuItem => !!item)
    .filter(hasChildren) 
    .map((item) => item.key as string);                                   
  const [openKeys, setOpenKeys] = useState(['']);
  const [current, setCurrent] = useState('');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split('/');
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  useEffect(() => {
    setOpenKeys(parentKeys);
  }, [parentKeys]);

   useEffect(() => {
    const paths = pathname.split('/');
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);
  
  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <Logo
        color="blue"
        asLink
        href={PATH_LANDING.root}
        justify="center"
        gap="small"
        imgSize={{ h: 28, w: 28 }}
        style={{ padding: '1rem 0' }}
      />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: 'none',
              itemSelectedBg: COLOR['100'],
              itemHoverBg: COLOR['50'],
              itemSelectedColor: COLOR['600'],
            },
          },
        }}
      >
        <Menu
          mode="inline"
          items={items}
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[current]}
          style={{ border: 'none' }}
          className="no-caret"
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
