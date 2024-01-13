import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home.js';


import StudentRegister from './Components/Student/StudentRegister'; 

import StudentLogin from './Components/Student/StudentLogin.js';
import FacultyLogin from './Components/Faculty/FacultyLogin.js';
import SecurityLogin from './Components/Security/SecurityLogin.js';

import StudentPage from './Components/Student/StudentPage.js';
import FacultyPage from './Components/Faculty/FacultyPage.js';
import SecurityPage from './Components/Security/SecurityPage.js';


import Navbar from './Components/Student/Navbar.js';
import StudentDisplayPass from './Components/Student/StudentDisplayPass.js';
import StudentPassForm from './Components/Student/StudentPassForm.js';
import StudentVerification from './Components/Student/StudentVerification.js';

import PreventForwardNavigation from './Components/PreventForwardNavigation'; 

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>

        <Route element={<Home />} path='/' />

          <Route element={<StudentRegister />} path='/StudentRegister' />
          <Route element={<StudentVerification />} path='/StudentVerification' />
          <Route element={<StudentLogin />} path='/StudentLogin' />
          <Route element={<StudentPage />} path='/StudentPage/:rollNo' />
          <Route element={<StudentDisplayPass />} path="/StudentDisplayPass"  />
          <Route element={<StudentPassForm />} path="/StudentPassForm"  />
          <Route element={<Navbar />} path="/Navbar"/>

          <Route element={<FacultyLogin />} path="/FacultyLogin" exact />
          <Route element={<FacultyPage />} path="/FacultyPage/:Employee_ID" />

          <Route element={<SecurityLogin />} path='/SecurityLogin'/>
          <Route element={<SecurityPage />} path='/SecurityPage/:UserName' exact />

          <Route element ={<PreventForwardNavigation />} path ='/PreventForwardNavigation' />
          <Route path='/StudentLogin' element={<PreventForwardNavigation><StudentLogin /></PreventForwardNavigation>} />
          <Route path='/FacultyLogin' element={<PreventForwardNavigation><FacultyLogin /></PreventForwardNavigation>} />
          <Route path='/SecurityLogin' element={<PreventForwardNavigation><SecurityLogin /></PreventForwardNavigation>} /> path="/student/:rollNo" component={StudentPage} /> */}

        </Routes> 
      </Router>
    </>
  );
}

export default App;
