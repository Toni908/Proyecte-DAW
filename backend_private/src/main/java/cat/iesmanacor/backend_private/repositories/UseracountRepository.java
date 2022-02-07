package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.entities.Useracount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.List;

public interface UseracountRepository extends JpaRepository<Useracount, BigInteger> {
    @Query(value = "SELECT * FROM user_acount WHERE correo = ?1",nativeQuery = true)
    List<Useracount> findUseracountsByCorreo(String correo);

    @Query(value = "SELECT * FROM user_acount WHERE nombre_usuario = ?1",nativeQuery = true)
    List<Useracount> findUseracountsByUsername(String username);

    @Query(value = "SELECT * FROM user_acount WHERE dni = ?1",nativeQuery = true)
    List<Useracount> findUseracountByDNI(String dni);

    @Query(value = "SELECT * FROM user_acount WHERE correo = ?1 AND contraseña = ?2",nativeQuery = true)
    List<Useracount> loginAccount(String correo, String contraseña);
}
