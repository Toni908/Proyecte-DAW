package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Reservas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface ReservasRepository extends JpaRepository<Reservas, BigInteger> {
}
