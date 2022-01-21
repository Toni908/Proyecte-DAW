package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Img;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.List;

public interface ImgRepository extends JpaRepository<Img, BigInteger> {
    @Query(value = "SELECT * FROM img WHERE url = ?1",nativeQuery = true)
    List<Img> findImgByUrl(String name);

    //GET IMG FROM USERACOUNT AND HIS RESTAURANTS
    @Query(value = "select id_img,url,img.id_restaurante from img inner join restaurante,user_acount where img.id_restaurante = restaurante.id_restaurante  and user_acount.id_user = restaurante.id_user and user_acount.id_user = ?1",nativeQuery = true)
    List<Img> findImgFromRestaurantByUseracount(BigInteger id);

    //GET IMG FROM RESTAURANT
    @Query(value = "select id_img, url, img.id_restaurante from img inner join restaurante where img.id_restaurante = restaurante.id_restaurante and img.id_restaurante = ?1",nativeQuery = true)
    List<Img> findImgFromRestaurantId(BigInteger id);
}
