import React, { useState } from 'react';
import Tempservice from './implements/Tempservice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom'; // Import Navigate
import HomePage from './components/HomePage/HomePage';
import Forms from './components/Forms/Forms';
import EmployeeSearch from "./implements/EmployeeSearch/EmployeeSearch";
import DisplayLogin from './implements/DisplayLogin/DisplayLogin';
import Login from './implements/Login/Login';
// import Signup from "./implements/Signup/Signup";
import Register from "./implements/Register/Register"
import About from './components/About/About';
import "./App.css";
import Programs from './components/Programs/Programs';
import TitleSearch from './components/TitleSearch/TitleSearch';
import SketchRoof from './components/SketchRoof/SketchRoof';
import SoftwareServices from './components/SoftwareServices/SoftwareServices';
import DisplayAll from './implements/DisplayAll/DisplayAll';
import { AuthProvider } from './implements/AuthContext/AuthContext';
import UserService from './implements/UserService/UserService';
import UpdateUser from './implements/UpdateUser/UpdateUser';
import Dimond from './components/Dimond/Dimond';
import EtServices from './Reports/EtServicesReports/EtServices/EtServices';
import EtSearchAddress from './Reports/EtServicesReports/EtSearchAddress/EtSearchAddress';
import EtServiceDisplay from './Reports/EtServicesReports/EtServiceDisplay/EtServiceDisplay';
import EtServiceSearch from './Reports/EtServicesReports/EtServiceSearch/EtServiceSearch';
import DasAddressSearch from './Reports/DiscoverAbstractServicesReports/DasAddressSearch/DasAddressSearch';
import DasDisplay from './Reports/DiscoverAbstractServicesReports/DasDisplay/DasDisplay';
import DasOrderSearch from './Reports/DiscoverAbstractServicesReports/DasOrderSearch/DasOrderSearch';
import DasReport from './Reports/DiscoverAbstractServicesReports/DasReport/DasReport';
import ForgetPassword from './implements/ForgetPassowrd/ForgetPassword';
import ResetPassword from './implements/ResetPassword/ResetPassword';
import Pagination from './implements/Pagination/Pagination';
import EmployeeDetail from './implements/EmployeeDetail/EmployeeDetail';
import ProtectedRoute from './implements/Logic/ProtectedRoute';


function App() {
  const [playState, setPlayState] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <div className="container">

            <Routes>
              <Route path="/" element={<HomePage playState={playState} setPlayState={setPlayState} />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/Login" element={<Login />} />

              <Route path="/EmployeeSearch" element={<EmployeeSearch />} />
              {/* <Route path="/Signup" element={<Signup />} /> */}
              <Route path="/Tempservice" element={<Tempservice />} />
              <Route path="/ForgetPassword" element={<ForgetPassword />} />
              <Route path="/ResetPassword" element={<ResetPassword />} />
              <Route path="/EmployeeDetail" element={<EmployeeDetail />} />


              <Route path="/SoftwareServices" element={<SoftwareServices />} />
              <Route path="/AuthProvider" element={<AuthProvider />} />


              <Route element={<ProtectedRoute role="ADMIN" redirectTo="/" />}>
                <Route path="/Register" element={<Register />} />
                <Route path="/DisplayALL" element={<DisplayAll />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                
              </Route>


              {/* Check if user is authenticated and admin before rendering admin-only routes */}
              {/* {UserService.adminOnly() && ( 
               <> 
                <Route path="/Register" element={<Register />} />
                <Route path="/DisplayALL" element={<DisplayAll/>} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
               </> 
            )}  */}
              <Route path="/SketchRoof" element={<SketchRoof />} />

              <Route path="/TitleSearch" element={<TitleSearch />} />
              <Route path="/Programs" element={<Programs />} />

              <Route path="/Dimond" element={<Dimond />} />

              <Route element={<ProtectedRoute redirectTo="/" />}>
                <Route path="/EtServices" element={<EtServices />} />
                <Route path="/EtSearchAddress" element={<EtSearchAddress />} />
                <Route path="/EtServiceDisplay/:orderNumber" element={<EtServiceDisplay />} />
                <Route path="/EtServiceSearch" element={<EtServiceSearch />} />
                <Route path="/DisplayLogin" element={<DisplayLogin />} />
              </Route>


              <Route path="/DasAddressSearch" element={<DasAddressSearch />} />
              <Route path="/DasDisplay/:orderNumber" element={<DasDisplay />} />
              <Route path="/DasOrderSearch" element={<DasOrderSearch />} />
              <Route path="/DasReport" element={<DasReport />} />
              <Route path="/Pagination" element={<Pagination />} />


              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App;
