import "./menu.css";
import {Component} from "react";

class Menu extends Component {

    render() {
        const {carta} = this.props;
        
        return(
            <div className="container">
                {carta.categorias!==undefined &&
                <div className="menu">
                    {carta.categorias.map(function (categoria, key) {
                        return(
                            <section key={key} className={"pb-5"}>
                                <h2 className="pb-3 m-0">
                                    {categoria.nombre}
                                </h2>
                                <hr className={"p-0 m-0"}/>
                                <div className="row">
                                    {categoria.platos.map(function (plato,key) {
                                        return(
                                            <div key={key} className="col-lg-6 col-12 pt-4 pb-2">
                                                <h4 className="m-0 d-flex justify-content-between">
                                                    <span className={"pe-2"}>{plato.nombre}</span>
                                                    <span>{plato.precio}€</span>
                                                </h4>
                                                <div className="menu-item-description">
                                                    {plato.descripcion!==undefined && <>{plato.descripcion}</>}
                                                    {plato.ingredientes!==undefined && plato.ingredientes.length!==0 && <>
                                                        <br/>
                                                        {plato.ingredientes.map(function (ingrediente, key) {
                                                            return(
                                                                <span className={"ingredientes"} key={key}>{ingrediente.nombre}</span>
                                                            )
                                                        })}
                                                    </>}
                                                    {plato.alergeno!==undefined && plato.alergeno.length!==0 && <>
                                                        <br/>
                                                        <div className={"d-flex flex-row flex-wrap"}>
                                                            {plato.alergeno.map(function (alergeno, key) {
                                                                return(
                                                                        <img key={key} className={"alorgeno-img me-2 mt-2"} src={process.env.REACT_APP_API_URL+"/alergenos/"+alergeno.id_alergeno} alt={"alorgeno"}/>
                                                                )
                                                            })}
                                                        </div>
                                                    </>}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </section>
                        )
                    })}
                </div>}
            </div>
        )
    }
}

export default Menu