import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Qualifications from './components/qualifications';
import Home from './components/Home';
import About from './components/about';
import Contact from './components/contact';
import Services from './components/services';
import Project from './components/project';
import Layout from './components/layout';
import Logo from './components/logo';
import Signin from './components/Signin';
import Signup from './components/Signup';

const MainRouter = () => {
    return (
        <div>
            <Layout />
            <Logo />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/services" element={<Services />} />
                <Route exact path="/project" element={<Project />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/qualifications" element={<Qualifications />} />
                <Route exact path="/signin" element={<Signin />} />
                <Route exact path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
};

export default MainRouter;