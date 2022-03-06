package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Comentarios;
import cat.iesmanacor.backend_private.repositories.ComentariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Service
public class ComentariosServiceImpl implements ComentariosService {
    @Autowired
    ComentariosRepository comentariosRepository;

    @Override
    public List<Comentarios> findAllComentarios() {
        return comentariosRepository.findAll();
    }

    @Override
    public Optional<Comentarios> findComentarioById(BigInteger id) {
        return comentariosRepository.findById(id);
    }

    @Override
    public Comentarios saveComentario(Comentarios comentariosNew) {
        if (comentariosNew != null) {
            return comentariosRepository.save(comentariosNew);
        }
        return new Comentarios();
    }

    @Override
    public void deleteComentario(BigInteger id) {
        if (comentariosRepository.findById(id).isPresent()) {
            comentariosRepository.deleteById(id);
        }
    }

    @Override
    public void updateComentario(Comentarios comentarios) {
        BigInteger id = comentarios.getId_comentario();
        if (comentariosRepository.findById(id).isPresent()) {
            Comentarios comentariosUpdate = new Comentarios();
            comentariosUpdate.setId_comentario(comentarios.getId_comentario());
            comentariosUpdate.setComentario(comentarios.getComentario());
            comentariosUpdate.setReserva(comentarios.getReserva());
            comentariosUpdate.setValoracion_comida(comentarios.getValoracion_comida());
            comentariosUpdate.setValoracion_servicio(comentarios.getValoracion_servicio());
            comentariosUpdate.setValoracion_sitio(comentarios.getValoracion_sitio());
            comentariosRepository.save(comentariosUpdate);
        }
    }

    @Override
    public List<Comentarios> findByIdRestaurante(BigInteger id) {
        return comentariosRepository.findByIdRestaurante(id);
    }

    @Override
    public Integer countComidaFromRestaurantValorationAndTime(BigInteger id, int valoracion) {
        return comentariosRepository.countComidaFromRestaurantValorationAndTime(id, valoracion);
    }

    @Override
    public Integer countServicioFromRestaurantValorationAndTime(BigInteger id, int valoracion) {
        return comentariosRepository.countServicioFromRestaurantValorationAndTime(id, valoracion);
    }

    @Override
    public Integer countSitioFromRestaurantValorationAndTime(BigInteger id, int valoracion) {
        return comentariosRepository.countSitioFromRestaurantValorationAndTime(id, valoracion);
    }

    @Override
    public Integer countComidaFromRestaurant(BigInteger id) {
        return comentariosRepository.countComidaFromRestaurant(id);
    }

    @Override
    public Integer countServicioFromRestaurant(BigInteger id) {
        return comentariosRepository.countServicioFromRestaurant(id);
    }

    @Override
    public Integer countSitioFromRestaurant(BigInteger id) {
        return comentariosRepository.countSitioFromRestaurant(id);
    }
}
