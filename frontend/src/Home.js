import React, { Component } from 'react';
import Main from './components/components_interns/Main';
import Footer from './components/components_interns/Footer';

class Home extends Component {
    render() {
    return(
        <div className='Home'>
            <Main />
            <Footer />
        </div>
        );
    }

}

export default Home