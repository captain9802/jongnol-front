import React from 'react';
import Header from '../components/header';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {

  const location = useLocation();

  const noHeaderPaths = ['/login', '/join'];

  return (
    <>
      {!noHeaderPaths.includes(location.pathname) && <Header />}
        <main>
            <Outlet></Outlet>
        </main>
    </>
  );
}

export default Layout;