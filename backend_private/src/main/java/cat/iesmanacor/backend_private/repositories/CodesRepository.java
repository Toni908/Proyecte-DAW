package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Codes;
import cat.iesmanacor.backend_private.entities.CodesId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.List;

public interface CodesRepository extends JpaRepository<Codes, CodesId> {
    @Query(value = "SELECT * FROM codes WHERE codigo = ?1 AND types = ?2",nativeQuery = true)
    List<Codes> findFromTypesAndCodes(String codigo, String type);

    @Query(value = "SELECT * FROM codes WHERE id_user = ?1 AND codigo = ?2",nativeQuery = true)
    List<Codes> findFromCodesAndUseracount(BigInteger user, String code);

//    @Modifying
//    @Query(value = "DELETE FROM password_recuperar WHERE id_user = ?1",nativeQuery = true)
//    void deleteCode(BigInteger user);
}
