import React, { Component } from 'react';
import Header from './components/components_interns/Header';
import Main from './components/components_interns/Main';
import Footer from './components/components_interns/Footer';

class Home extends Component {
    render() {
    return(
        <div className='Home'>
            <Header />
            <Main />
            <Footer />
        </div>
        );
    }

}

export default Home