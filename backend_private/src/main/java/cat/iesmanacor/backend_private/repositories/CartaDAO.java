package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Carta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.Optional;

public interface CartaDAO extends JpaRepository<Carta,Long> {
    @Query(value = "SELECT carta.id_carta, carta.nombre, carta.url_img, carta.usa_img, carta.visible, carta.id_restaurante FROM carta inner join restaurante where restaurante.id_restaurante = carta.id_restaurante and carta.id_restaurante = ?1 and carta.visible = 1 group by carta.id_carta;",nativeQuery = true)
    Optional<Carta> cartaVisibleFromRestaurant(BigInteger id);
}
