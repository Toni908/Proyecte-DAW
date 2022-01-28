package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Reservas;
import cat.iesmanacor.backend_private.repositories.ReservasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Service
public class ReservasServiceImpl implements ReservasService {
    @Autowired
    ReservasRepository reservasRepository;

    @Override
    public List<Reservas> findAllReservass() {
        return reservasRepository.findAll();
    }

    @Override
    public Optional<Reservas> findReservaById(BigInteger id) {
        return reservasRepository.findById(id);
    }

    @Override
    public Reservas saveReserva(Reservas reservasNew) {
        if (reservasNew!=null) {
            reservasRepository.save(reservasNew);
        }
        return new Reservas();
    }

    @Override
    public void deleteReserva(BigInteger id) {
        if (reservasRepository.findById(id).isPresent()) {
            reservasRepository.deleteById(id);
        }
    }

    @Override
    public void updateReserva(Reservas reservas) {
        BigInteger num = reservas.getId_reserva();
        if (reservasRepository.findById(num).isPresent()) {
            Reservas membresiaUpdate = new Reservas(
                    reservas.getId_reserva(),
                    reservas.getPersonas(),
                    reservas.getCorreo(),
                    reservas.getTelefono(),
                    reservas.getNombre(),
                    reservas.getLenguaje(),
                    reservas.getFecha_inicio(),
                    reservas.getFecha_fin(),
                    reservas.getRestaurant()
            );
            reservasRepository.save(membresiaUpdate);
        }
    }

    @Override
    public List<Reservas> findReservasByIdRestaurante(BigInteger id) {
        return reservasRepository.findReservasByIdRestaurante(id);
    }
}
