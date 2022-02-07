import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

class Header extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <header className={"w-100 bg-purple-light"}>

            </header>
            // <BrowserRouter>
            //     <div className="App">
            //         <div className="header">
            //             <ul className="header">
            //                 <li><NavLink exact to='/' activeClassName="active">Inicio</NavLink></li>
            //                 <li><NavLink to='/Buscador'  activeClassName="active">Buscador Avanzado</NavLink></li>
            //             </ul>
            //         </div>
            //         <div className="content">
            //             <Route path="/" exact component={Main} />
            //             <Route path="/buscador" component={Main} />
            //         </div>
            //     </div>
            // </BrowserRouter>
        );
    }
}

export default Header