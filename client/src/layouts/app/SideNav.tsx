import React, { useEffect, useRef, useState } from 'react';
import { ConfigProvider, Layout, Menu, MenuProps, SiderProps } from 'antd';
import {
  AppstoreAddOutlined,
  BranchesOutlined,
  BugOutlined,
  CalendarOutlined,
  DollarOutlined,
  FieldTimeOutlined,
  GithubOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
  MenuOutlined,
  PieChartOutlined,
  ProductOutlined,
  ScheduleOutlined,
  SecurityScanOutlined,
  SnippetsOutlined,
  UserAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Logo } from '../../components';
import { Link, useLocation } from 'react-router-dom';
import {
  PATH_ABOUT,
  PATH_AUTH,
  PATH_CORPORATE,
  PATH_DASHBOARD,
  PATH_DASHBOARD_ADMIN,
  PATH_CLIENTS,
  PATH_DOCS,
  PATH_ERROR,
  PATH_GITHUB,
  PATH_LANDING,
  PATH_SITEMAP,
  PATH_USER_PROFILE,
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
    getItem(<Link to={PATH_CLIENTS.root}>Clients list</Link>, 'clients', <MenuOutlined />),
    getItem(<Link to={PATH_CLIENTS.create}>Create client</Link>, 'create_client', <UserAddOutlined />)
  ]),
  getItem('Sessions', 'sessions', <FieldTimeOutlined />, [
    getItem(<Link to={PATH_SESSION.root}>Sessions list</Link>, 'sessions', <CalendarOutlined />),
    getItem(<Link to={PATH_SESSION.create}>Create session</Link>, 'create_session', <ScheduleOutlined />)
  ]),
  getItem(<Link to={PATH_EXPENSES.root}>Expenses</Link>, 'expenses', <DollarOutlined />),
  getItem('Dashboards', 'dashboards', <PieChartOutlined />, [
    getItem(<Link to={PATH_DASHBOARD.default}>Default</Link>, 'default', null),
    getItem(
      <Link to={PATH_DASHBOARD.projects}>Projects</Link>,
      'projects',
      null
    ),
    getItem(
      <Link to={PATH_DASHBOARD.ecommerce}>eCommerce</Link>,
      'ecommerce',
      null
    ),
    getItem(
      <Link to={PATH_DASHBOARD.marketing}>Marketing</Link>,
      'marketing',
      null
    ),
    getItem(<Link to={PATH_DASHBOARD.social}>Social</Link>, 'social', null),
    getItem(<Link to={PATH_DASHBOARD.bidding}>Bidding</Link>, 'bidding', null),
    getItem(
      <Link to={PATH_DASHBOARD.learning}>Learning</Link>,
      'learning',
      null
    ),
    getItem(
      <Link to={PATH_DASHBOARD.logistics}>Logistics</Link>,
      'logistics',
      null
    ),
  ]),

  getItem('Pages', 'pages', null, [], 'group'),

  getItem('Authentication', 'authentication', <SecurityScanOutlined />, [
    getItem(<Link to={PATH_AUTH.signin}>Sign In</Link>, 'auth-signin', null),
    getItem(<Link to={PATH_AUTH.signup}>Sign Up</Link>, 'auth-signup', null),
    getItem(<Link to={PATH_AUTH.welcome}>Welcome</Link>, 'auth-welcome', null),
    getItem(
      <Link to={PATH_AUTH.verifyEmail}>Verify email</Link>,
      'auth-verify',
      null
    ),
    getItem(
      <Link to={PATH_AUTH.passwordReset}>Password reset</Link>,
      'auth-password-reset',
      null
    ),
    // getItem(<Link to={PATH_AUTH.passwordConfirm}>Passsword confirmation</Link>, 'auth-password-confirmation', null),
    getItem(
      <Link to={PATH_AUTH.accountDelete}>Account deleted</Link>,
      'auth-account-deactivation',
      null
    ),
  ]),

  getItem(
    <Link to={PATH_DOCS.components} target="_blank">
      Components
    </Link>,
    'components',
    <AppstoreAddOutlined />
  )
];

const rootSubmenuKeys = ['dashboards', 'corporate', 'user-profile'];

type SideNavProps = SiderProps;

const SideNav = ({ ...others }: SideNavProps) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
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
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
