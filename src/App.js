import React from "react";
import Routes from './routes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import './styles/reset.css';
import './styles/App.css';

const App = () => (
    <div className="main-app">
        <Header />
        <Routes />
        <Footer />
    </div>
);

export default App;