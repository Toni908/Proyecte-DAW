import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Translate from "../locales/Translate";
class Footer extends Component {

    render() {
        return(
            <footer className="footer w-100 mx-0 mt-auto">
            <div className="w-100 text-center bg-white">
              <div className="container pb-0 pt-3">
              <Translate string={'fot'}/> <a className="text-black" href={"http://admin." + process.env.REACT_APP_URL + ":8080/register"}> <Translate string={'fot2'}/></a><Translate string={'fot3'}/>
              </div>

              <hr></hr>
            
              <div className="text-center p-1 mb-0">
                © 2022 Copyright: 
                <div><a className="text-black" href={"https://www." + process.env.REACT_APP_URL}>{process.env.REACT_APP_URL}</a></div>
              </div>
            </div>
          </footer>
        );
    }
}

export default Footer