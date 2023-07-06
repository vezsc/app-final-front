import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RecoilRoot, atom } from 'recoil';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import KakaoCallBackPage from './pages/KakaoCallBackPage';
import HomePage from './pages/HomePage';
import DeactivatePage from './pages/settings/DeactivatePage';
import DeactivatedPage from './pages/settings/DeactivatedPage';
import ProfilePage from './pages/settings/ProfilePage';


//==========================================================
export const jwtState = atom(
  { key: "jwtState", default: null }
);
export const userEmailState = atom(
  { key: "userEmailState", default: null }
);
//============================================================

const router = createBrowserRouter([
  { path: "/", element: <IndexPage />, },
  { path: "/flow/login", element: <LoginPage /> },
  { path: "/flow/signup", element: <SignupPage /> },
  { path: "/flow/kakao/callback", element: <KakaoCallBackPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/settings/profile", element: <ProfilePage /> },
  { path: "/settings/deactivate", element: <DeactivatePage /> },
  { path: "/settings/deactivated", element: <DeactivatedPage /> }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);




