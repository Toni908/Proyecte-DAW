import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocaleContext } from "./LocaleContext.js";

import Home from "./Home";
import BuscadorAvanzado from "./BuscadorAvanzado";
import AboutUs from "./AboutUs";
import Comment from "./Comment";
import Header from "./components/Header";
import Footer from "./components/Footer";

import './App.css';
import './components/components_interns/main.css'
import Restaurant from "./components/paginas/Restaurant";

class App extends Component {

  constructor(props) {
    super(props);

    // Idioma per defecte 
    this.state = {
      preferredLocale: "es"
    };
 }

 changeLanguage = ({ currentTarget: { id } }) => {
  this.setState({
    preferredLocale: id
  });
};

  render() {
    return (
      <LocaleContext.Provider value={this.state.preferredLocale}>
        <Router>
          <div className="d-flex flex-column min-vh-100 App">

            <Header changeLanguage={this.changeLanguage}/>

            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<BuscadorAvanzado />} />
                <Route path="/us" element={<AboutUs />} />
                <Route path="/carta/:id" element={<AboutUs />} />
                <Route path="/comment/:id" element={<Comment className="bg-white"/>} />
                <Route path="/reserva/:id" element={<AboutUs />} />
                <Route path="/restaurant/:id" element={<Restaurant />} />
              </Routes>
            </div>
          
            <Footer />

          </div>
        </Router>
      </LocaleContext.Provider>
    );
  }
}

export default App;