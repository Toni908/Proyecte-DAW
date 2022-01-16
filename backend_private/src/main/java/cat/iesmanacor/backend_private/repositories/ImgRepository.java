package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Img;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.List;

public interface ImgRepository extends JpaRepository<Img, BigInteger> {
    @Query(value = "SELECT * FROM img WHERE url = ?1",nativeQuery = true)
    List<Img> findImgByUrl(String name);
}
