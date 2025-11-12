import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './MainRouter';
import { AuthProvider } from './auth/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <MainRouter />
            </Router>
        </AuthProvider>
    );
};

export default App;