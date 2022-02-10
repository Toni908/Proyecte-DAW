package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Password_recuperar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface Password_recuperarRepository extends JpaRepository<Password_recuperar, BigInteger> {

}
