package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Localidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.List;

public interface LocalidadRepository extends JpaRepository<Localidad, BigInteger> {
    @Query(value = "SELECT * FROM localidad WHERE nombre_localidad = ?1",nativeQuery = true)
    List<Localidad> findLocalidadByNombre_localidad(String nombre);
}
