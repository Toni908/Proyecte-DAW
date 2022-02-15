import React, { Component } from 'react';

import './Buscador.css';

class App extends Component {

  render() {
    return (
        <div className="p-3 mb-3">
            <h1 className="text-center buscarTitulo"> Buscar Restaurante</h1>
            <div className="text-center">
                <form className="d-flex w-50 justify-content-center mx-auto">
                    <select className="form-select mx-4 inputBuscador w-auto" aria-label="Default select example">
                        <option defaultValue>Etiquetas</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>

                    <select className="form-select mx-4 inputBuscador w-auto" aria-label="Default select example">
                        <option defaultValue>Sitio</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>

                    <select className="form-select mx-4 inputBuscador w-auto" aria-label="Default select example">
                        <option defaultValue>Precio</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </form>
            </div>
        </div>
    );
  }
}

export default App;