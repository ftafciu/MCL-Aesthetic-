import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
import {
  AccountDeactivePage,
  Error400Page,
  Error403Page,
  Error404Page,
  Error500Page,
  Error503Page,
  ErrorPage,
  PasswordResetPage,
  SignInPage,
  SignUpPage,
  VerifyEmailPage,
  WelcomePage,
} from '../pages';
import {
  DashboardLayout,
  GuestLayout,
  UserAccountLayout,
} from '../layouts';
import React, { ReactNode, useEffect } from 'react';
import { Dashboard } from '../pages/admin/dashboard/index.tsx';
import ListContent from '../pages/admin/clients/content/ListContent.tsx';
import ExpensePage from '../pages/admin/expenses/index.tsx';
import SafeRoute from '../pages/authentication/SafeRoute.tsx';
import CreateContent from '../pages/admin/clients/content/CreateContent.tsx';
import EditContent from '../pages/admin/clients/content/EditContent.tsx';
import SessionPage from '../pages/admin/sessions/index.tsx';
import CreateSessionContent from '../pages/admin/sessions/CreateSessionContent.tsx';
import { DetailsPage } from '../pages/admin/profile/Details.tsx';
import { SecurityPage } from '../pages/admin/profile/Security.tsx';
import FinishedSessions from '../pages/admin/sessions/FinishedSessionContent.tsx';

// Custom scroll restoration function
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    }); // Scroll to the top when the location changes
  }, [pathname]);

  return null; // This component doesn't render anything
};

type PageProps = {
  children: ReactNode;
};

// Create an HOC to wrap your route components with ScrollToTop
const PageWrapper = ({ children }: PageProps) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <PageWrapper children={<GuestLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '',
        element: <Navigate to="/auth/signin" replace />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "",
        element: <SafeRoute><Dashboard /></SafeRoute>
      }
    ]
  },
  {
    path: "/client",
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "",
        element: <SafeRoute><ListContent /></SafeRoute>
      },
      {
        path: 'create',
        element: <SafeRoute><CreateContent /></SafeRoute>
      },
      {
        path: 'edit/:id',
        element: <SafeRoute><EditContent /></SafeRoute>
      }
    ]
  },
  {
    path: "/expenses",
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "",
        element: <SafeRoute><ExpensePage /></SafeRoute>
      }
    ]
  },
  {
    path: '/sessions',
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "",
        element: <SafeRoute><SessionPage /></SafeRoute>
      },
      {
        path: "create-session",
        element: <SafeRoute><CreateSessionContent /></SafeRoute>
      },
      {
        path: "finished-session",
        element: <SafeRoute><FinishedSessions /></SafeRoute>
      }
    ]
  },
  {
    path: '/profile',
    element: <PageWrapper children={<UserAccountLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "details",
        element: <SafeRoute><DetailsPage /></SafeRoute>
      },
      {
        path: 'security',
        element: <SafeRoute><SecurityPage /></SafeRoute>
      }
    ]
  },
  {
    path: '/auth',
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'signin',
        element: <SafeRoute><SignInPage /></SafeRoute>,
      },
      {
        path: 'welcome',
        element: <WelcomePage />,
      },
      {
        path: 'verify-email',
        element: <VerifyEmailPage />,
      },
      {
        path: 'password-reset',
        element: <SafeRoute><PasswordResetPage /></SafeRoute>,
      },
      {
        path: 'account-delete',
        element: <AccountDeactivePage />,
      },
    ],
  },
  {
    path: 'errors',
    errorElement: <ErrorPage />,
    children: [
      {
        path: '400',
        element: <Error400Page />,
      },
      {
        path: '403',
        element: <Error403Page />,
      },
      {
        path: '404',
        element: <Error404Page />,
      },
      {
        path: '500',
        element: <Error500Page />,
      },
      {
        path: '503',
        element: <Error503Page />,
      },
    ],
  },
]);

export default router;
