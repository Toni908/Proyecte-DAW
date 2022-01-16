package cat.iesmanacor.backend_private.services;


import cat.iesmanacor.backend_private.entities.Etiquetas;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface EtiquetasService {
    public List<Etiquetas> findAllEtiquetas();

    public Optional<Etiquetas> findEtiquetaById(BigInteger id);

    public Etiquetas saveEtiqueta(Etiquetas etiquetasNew);

    public void deleteEtiqueta(BigInteger id);

    public void updateEtiqueta(Etiquetas etiquetas);

    public List<Etiquetas> findEtiquetaByName(String name);
}
