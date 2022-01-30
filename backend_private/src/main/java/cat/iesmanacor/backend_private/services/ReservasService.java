package cat.iesmanacor.backend_private.services;


import cat.iesmanacor.backend_private.entities.Reservas;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface ReservasService {
    public List<Reservas> findAllReservass();

    public Optional<Reservas> findReservaById(BigInteger id);

    public Reservas saveReserva(Reservas reservasNew);

    public void deleteReserva(BigInteger id);

    public void updateReserva(Reservas reservas);

    // QUERY

    List<Reservas> findReservasByIdRestaurante(BigInteger id);

    List<Reservas> findReservasByFechaAndRestaurante(BigInteger id, String fecha_inicio, String fecha_fin);
}
