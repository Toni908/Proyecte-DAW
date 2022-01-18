package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Membresia;
import cat.iesmanacor.backend_private.entities.Municipios;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface MunicipioService {
    public List<Municipios> findAllMunicipios();

    public Optional<Municipios> findMunicipioById(String id);

    public Municipios saveMunicipio(Municipios municipiosNew);

    public void deleteMunicipio(String id);

    public void updateMunicipio(Municipios municipios);
}
