package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Horario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HorarioDAO extends JpaRepository<Horario,Long> {
}
