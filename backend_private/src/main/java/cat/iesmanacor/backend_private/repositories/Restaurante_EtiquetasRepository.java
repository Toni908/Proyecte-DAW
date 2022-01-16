package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Restaurante_Etiquetas;
import cat.iesmanacor.backend_private.entities.Restaurante_EtiquetasId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Restaurante_EtiquetasRepository extends JpaRepository<Restaurante_Etiquetas, Restaurante_EtiquetasId> {
//    @Query(value = "SELECT * FROM restaurante_etiquetas WHERE id_restaurante = ?1",nativeQuery = true)
//    List<Restaurante_Etiquetas> findByIdRestaurant(BigInteger id);
//
//    @Query(value = "SELECT * FROM restaurante_etiquetas WHERE id_etiqueta = ?1",nativeQuery = true)
//    List<Restaurante_Etiquetas> findByIdEtiquetas(BigInteger id);
}
