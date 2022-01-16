package cat.iesmanacor.backend_private.services;


import cat.iesmanacor.backend_private.entities.Localidad;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface LocalidadService {
    public List<Localidad> findAllLocalidad();

    public Optional<Localidad> findLocalidadById(BigInteger id);

    public Localidad saveLocalidad(Localidad localidadNew);

    public void deleteLocalidad(BigInteger id);

    public void updateLocalidad(Localidad localidad);

    // QUERY

    public List<Localidad> findLocalidadByNombre_localidad(String nombre);
}
