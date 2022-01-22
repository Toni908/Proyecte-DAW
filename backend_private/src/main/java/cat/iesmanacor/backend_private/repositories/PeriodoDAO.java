package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Periodo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PeriodoDAO extends JpaRepository<Periodo,Long> {
}
