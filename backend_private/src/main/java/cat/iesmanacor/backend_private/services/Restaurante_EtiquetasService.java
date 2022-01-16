package cat.iesmanacor.backend_private.services;


import cat.iesmanacor.backend_private.entities.Restaurante_Etiquetas;
import cat.iesmanacor.backend_private.entities.Restaurante_EtiquetasId;

import java.util.List;
import java.util.Optional;

public interface Restaurante_EtiquetasService {
    public List<Restaurante_Etiquetas> findAllRestaurante_Etiquetas();

    public Optional<Restaurante_Etiquetas> findRestaurante_EtiquetasById(Restaurante_EtiquetasId id);

    public Restaurante_Etiquetas saveRestaurante_Etiquetas(Restaurante_Etiquetas reservasNew);

    public void deleteRestaurante_Etiquetas(Restaurante_EtiquetasId id);

    public void updateRestaurante_Etiquetas(Restaurante_Etiquetas reservas);
}
