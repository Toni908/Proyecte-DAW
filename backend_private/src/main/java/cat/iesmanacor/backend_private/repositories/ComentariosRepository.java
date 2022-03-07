package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Comentarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.List;

public interface ComentariosRepository extends JpaRepository<Comentarios, BigInteger> {
    @Query(value = "select id_comentario, comentario, valoracion_sitio, valoracion_servicio, valoracion_comida, comentarios.id_reserva from comentarios inner join reserva where reserva.id_restaurante = ?1 and reserva.id_reserva = comentarios.id_reserva",nativeQuery = true)
    List<Comentarios> findByIdRestaurante(BigInteger id);

    @Query(value = "select count(valoracion_comida) from comentarios inner join reserva where reserva.id_restaurante = ?1 and comentarios.valoracion_comida = ?2 and reserva.id_reserva = comentarios.id_reserva  and fecha<=current_timestamp();",nativeQuery = true)
    Integer countComidaFromRestaurantValorationAndTime(BigInteger id,int valoracion);

    @Query(value = "select count(valoracion_servicio) from comentarios inner join reserva where reserva.id_restaurante = ?1 and comentarios.valoracion_servicio = ?2 and reserva.id_reserva = comentarios.id_reserva and fecha<=current_timestamp();",nativeQuery = true)
    Integer countServicioFromRestaurantValorationAndTime(BigInteger id,int valoracion);

    @Query(value = "select count(valoracion_sitio) from comentarios inner join reserva where reserva.id_restaurante = ?1 and comentarios.valoracion_sitio = ?2 and reserva.id_reserva = comentarios.id_reserva and fecha<=current_timestamp();",nativeQuery = true)
    Integer countSitioFromRestaurantValorationAndTime(BigInteger id,int valoracion);

    @Query(value = "select sum(valoracion_comida) from comentarios inner join reserva where reserva.id_restaurante = ?1 and reserva.id_reserva = comentarios.id_reserva  and fecha<=current_timestamp()",nativeQuery = true)
    Integer countComidaFromRestaurant(BigInteger id);

    @Query(value = "select sum(valoracion_servicio) from comentarios inner join reserva where reserva.id_restaurante = ?1 and reserva.id_reserva = comentarios.id_reserva and fecha<=current_timestamp()",nativeQuery = true)
    Integer countServicioFromRestaurant(BigInteger id);

    @Query(value = "select sum(valoracion_servicio) from comentarios inner join reserva where reserva.id_restaurante = ?1 and reserva.id_reserva = comentarios.id_reserva and fecha<=current_timestamp()",nativeQuery = true)
    Integer countSitioFromRestaurant(BigInteger id);
}
