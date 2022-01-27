package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Reservas;
import cat.iesmanacor.backend_private.entities.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.List;

public interface ReservasRepository extends JpaRepository<Reservas, BigInteger> {
    //IS VISIBLE BOOLEAN
    @Query(value = "SELECT * FROM reserva where id_restaurante = ?1",nativeQuery = true)
    List<Reservas> findReservasByIdRestaurante(BigInteger id);
}
