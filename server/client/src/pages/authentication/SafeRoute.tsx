import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorize } from './scripts/auth-scripts.ts';

function SafeRoute(props: any) {
  const POLLING_INTERVAL = 60000;
  const navigator = useNavigate();

  useEffect(() => {
    authorize(navigator, window.location.href);
    const intervalId = setInterval(() => {
      authorize(navigator, window.location.href);
    }, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [window.location.href]);

  return <>{props.children}</>;
}

export default SafeRoute;