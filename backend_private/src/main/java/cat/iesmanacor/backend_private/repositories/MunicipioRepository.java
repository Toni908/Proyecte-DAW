package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Municipios;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MunicipioRepository extends JpaRepository<Municipios, String> {
}
