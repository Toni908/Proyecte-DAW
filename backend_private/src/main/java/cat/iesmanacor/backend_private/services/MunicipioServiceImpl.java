package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Municipios;
import cat.iesmanacor.backend_private.repositories.MunicipioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Service
public class MunicipioServiceImpl implements MunicipioService{
    @Autowired
    MunicipioRepository municipioRepository;

    @Override
    public List<Municipios> findAllMunicipios() {
        return municipioRepository.findAll();
    }

    @Override
    public Optional<Municipios> findMunicipioById(String id) {
        return municipioRepository.findById(id);
    }

    @Override
    public Municipios saveMunicipio(Municipios municipiosNew) {
        if (municipiosNew!=null) {
            return municipioRepository.save(municipiosNew);
        }
        return null;
    }

    @Override
    public void deleteMunicipio(String id) {
        if (municipioRepository.findById(id).isPresent()) {
            municipioRepository.deleteById(id);
        }
    }

    @Override
    public void updateMunicipio(Municipios municipios) {
        String num = municipios.getNombre_municipio();
        if (municipioRepository.findById(num).isPresent()) {
            Municipios municipio = new Municipios(
                    municipios.getId_municipio(),
                    municipios.getNombre_municipio()
            );
            municipioRepository.save(municipio);
        }
    }
}
