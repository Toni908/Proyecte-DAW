package cat.iesmanacor.backend_private.services;


import cat.iesmanacor.backend_private.entities.Membresia;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface MembresiaService {
    public List<Membresia> findAllMembresia();

    public Optional<Membresia> findMembresiaById(BigInteger id);

    public Membresia saveMembresia(Membresia membresiaNew);

    public void deleteMembresia(BigInteger id);

    public void updateMembresia(Membresia membresia);

    // QUERY

    public List<Membresia> findMembresiaByNum_Factura(String num_factura);
}
