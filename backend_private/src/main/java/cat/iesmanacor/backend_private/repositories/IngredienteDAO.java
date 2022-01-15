package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredienteDAO extends JpaRepository<Ingrediente,Long> {

}
