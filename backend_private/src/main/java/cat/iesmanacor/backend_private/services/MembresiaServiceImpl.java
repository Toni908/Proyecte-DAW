package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Membresia;
import cat.iesmanacor.backend_private.repositories.MembresiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Service
public class MembresiaServiceImpl implements MembresiaService {

    @Autowired
    MembresiaRepository membresiaRepository;

    @Override
    public List<Membresia> findAllMembresia() {
        return membresiaRepository.findAll();
    }

    @Override
    public Optional<Membresia> findMembresiaById(BigInteger id) {
        return membresiaRepository.findById(id);
    }

    @Override
    public List<Membresia> findMembresiaByNum_Factura(String num_factura) {
        return membresiaRepository.findMembresiaByNum_Factura(num_factura);
    }

    @Override
    public Membresia saveMembresia(Membresia membresiaNew) {
        if (membresiaNew != null) {
            return membresiaRepository.save(membresiaNew);
        }
        return new Membresia();
    }

    @Override
    public void deleteMembresia(BigInteger id) {
        if (membresiaRepository.findById(id).isPresent()) {
            membresiaRepository.deleteById(id);
        }
    }

    @Override
    public void updateMembresia(Membresia membresia) {
        BigInteger num = membresia.getId_membresia();
        if (membresiaRepository.findById(num).isPresent()) {
            Membresia membresiaUpdate = new Membresia(
                    membresia.getId_membresia(),
                    membresia.getFecha_inicio(),
                    membresia.getFecha_fin(),
                    membresia.getFactura()
            );
            membresiaRepository.save(membresiaUpdate);
        }
    }
}
