import React, { Component } from 'react';
import Menu from './components/paginas/Menu';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

class CartaRepresentar extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
          carta: [],
          id: 0
        }
  
      }
  
      componentDidMount(){
        var url = window.location.href;
        var l = url.split('/');
        var d = l.length-1;
        var id = l[d];
        this.setState({id: id});

        var ip = process.env.REACT_APP_API_URL;

        var url = ip + '/carta/'+ id;

        console.log(url);

        axios.get(url).then((result) => {
            this.setState({carta: result.data.carta});

        }).catch((err) => {
            alert("A sucedido un error, porfavor intentelo mas tarde");
        });
      }

    render() {
        const {carta, id} = this.state
        if(carta === undefined){
        return(
                <div>
                    No hay carta activa
                </div>
            );
        }else{
            return(
                <div className=''>
                    {!carta.usa_img && <Menu carta={carta}/>}
                    {carta.usa_img===1 && <img className={"w-100 h-auto p-2"} 
                    src={process.env.REACT_APP_API_URL+"/image/"+id+"/"+carta.url_img} 
                    alt={carta.nombre}/>}
                </div>
                );
        }
    }

}

export default CartaRepresentar