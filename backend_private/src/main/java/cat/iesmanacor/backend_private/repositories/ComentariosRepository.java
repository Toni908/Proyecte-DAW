package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Comentarios;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface ComentariosRepository extends JpaRepository<Comentarios, BigInteger> {
}
