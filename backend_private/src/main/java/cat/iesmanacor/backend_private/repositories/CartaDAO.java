package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Carta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartaDAO extends JpaRepository<Carta,Long> {

}
