function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_LANDING = '/';
//
const ROOT_DASHBOARD = "/dashboard";
const ROOT_CLIENT = '/client';
const ROOT_EXPENSES = "/expenses";
const ROOT_SESSIONS = '/sessions';
const ROOTS_PROFILE = '/profile';
//
const ROOTS_DASHBOARD = '/dashboards';
const ROOTS_SITEMAP = '/sitemap';
const ROOTS_LAYOUT = '/layouts';
const ROOTS_AUTH = '/auth';
const ROOTS_ERRORS = '/errors';
export const PATH_LANDING = {
  root: ROOTS_LANDING,
  why: '/why-us',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
};

export const PATH_DASHBOARD_ADMIN = {
  root: ROOT_DASHBOARD,
}

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  default: path(ROOTS_DASHBOARD, '/default'),
  projects: path(ROOTS_DASHBOARD, '/projects'),
  ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
  marketing: path(ROOTS_DASHBOARD, '/marketing'),
  social: path(ROOTS_DASHBOARD, '/social'),
  bidding: path(ROOTS_DASHBOARD, '/bidding'),
  learning: path(ROOTS_DASHBOARD, '/learning'),
  logistics: path(ROOTS_DASHBOARD, '/logistics'),
};

export const PATH_CLIENTS = {
  root: ROOT_CLIENT,
  create: path(ROOT_CLIENT, '/create'),
  edit: path(ROOT_CLIENT, 'edit/:id')
};

export const PATH_EXPENSES = {
  root: ROOT_EXPENSES
}

export const PATH_SESSION = {
  root: ROOT_SESSIONS,
  create: path(ROOT_SESSIONS, '/create-session'),
}

export const PATH_SITEMAP = {
  root: ROOTS_SITEMAP,
};

export const PATH_LAYOUT = {
  root: ROOTS_LAYOUT,
  sidebar: {
    light: path(ROOTS_LAYOUT, '/sidebar/light'),
    dark: path(ROOTS_LAYOUT, '/sidebar/dark'),
    minimized: path(ROOTS_LAYOUT, '/sidebar/minimized'),
  },
  header: {
    light: path(ROOTS_LAYOUT, '/header/light'),
    dark: path(ROOTS_LAYOUT, '/header/dark'),
    overlay: path(ROOTS_LAYOUT, '/header/overlay'),
  },
};

export const PATH_USER_PROFILE = {
  root: ROOTS_PROFILE,
  details: path(ROOTS_PROFILE, '/details'),
  security: path(ROOTS_PROFILE, '/security'),
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signin: path(ROOTS_AUTH, '/signin'),
  signup: path(ROOTS_AUTH, '/signup'),
  passwordReset: path(ROOTS_AUTH, '/password-reset'),
  passwordConfirm: path(ROOTS_AUTH, '/password-confirmation'),
  welcome: path(ROOTS_AUTH, '/welcome'),
  verifyEmail: path(ROOTS_AUTH, '/verify-email'),
  accountDelete: path(ROOTS_AUTH, '/account-delete'),
};

export const PATH_ERROR = {
  root: ROOTS_ERRORS,
  error400: path(ROOTS_ERRORS, '/400'),
  error403: path(ROOTS_ERRORS, '/403'),
  error404: path(ROOTS_ERRORS, '/404'),
  error500: path(ROOTS_ERRORS, '/500'),
  error503: path(ROOTS_ERRORS, '/503'),
};