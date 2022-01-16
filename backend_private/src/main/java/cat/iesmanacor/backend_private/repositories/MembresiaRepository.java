package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Membresia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.List;

public interface MembresiaRepository extends JpaRepository<Membresia, BigInteger> {
    @Query(value = "SELECT * FROM membresia WHERE num_factura = ?1",nativeQuery = true)
    List<Membresia> findMembresiaByNum_Factura(String num_factura);
}
