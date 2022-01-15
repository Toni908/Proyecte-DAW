package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaDAO extends JpaRepository<Categoria,Long> {
}
