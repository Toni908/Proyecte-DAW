package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.DiaSemanalPeriodo;
import cat.iesmanacor.backend_private.entities.DiaSemanalPeriodoPKId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaSemanalPeriodoDAO extends JpaRepository<DiaSemanalPeriodo, DiaSemanalPeriodoPKId>{
}
