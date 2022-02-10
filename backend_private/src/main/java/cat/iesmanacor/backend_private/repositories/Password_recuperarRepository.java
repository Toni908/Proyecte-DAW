package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Password_recuperar;
import cat.iesmanacor.backend_private.entities.Restaurante_Etiquetas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.List;

public interface Password_recuperarRepository extends JpaRepository<Password_recuperar, BigInteger> {
    @Query(value = "SELECT * FROM password_recuperar WHERE id_user = ?1",nativeQuery = true)
    List<Password_recuperar> findByIdUseracount(BigInteger id);

    @Query(value = "SELECT * FROM password_recuperar WHERE id_user = ?1 AND codigo = ?2",nativeQuery = true)
    List<Password_recuperar> isCodeFromUseracount(BigInteger user, BigInteger code);
}
