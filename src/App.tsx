import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { RecoilRoot } from 'recoil';


const Layout = lazy(() => import('./layout/index'));
const Login = lazy(() => import('./pages/login/login'));
const Register = lazy(() => import('./pages/register/register'));
const Home = lazy(() => import('./pages/dashboard/home'));
const CustomPage = lazy(() => import('./pages/customPage/customPage'));
const Newpage = lazy(() => import('./pages/addPage/newPage'));



//const clientId = "107956742788-25vj17m0r48ao74o7n8b6ap82vhulnoi.apps.googleusercontent.com";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>

            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/" element={<Layout />}>
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/nova-pagina/:userHash?/:pageId?"
                element={
                  <PrivateRoute>
                    <Newpage />
                  </PrivateRoute>
                }
              />

              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="pagina/:hash" element={<CustomPage />} />
            </Route>

          </Routes>
        </Suspense>
      </Router>
    </RecoilRoot>
  );
}

export default App;