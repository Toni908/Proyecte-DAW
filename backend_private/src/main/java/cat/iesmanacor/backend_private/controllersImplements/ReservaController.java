package cat.iesmanacor.backend_private.controllersImplements;

import cat.iesmanacor.backend_private.entities.Reservas;
import org.springframework.ui.ModelMap;

import java.math.BigInteger;

public interface ReservaController {
    public String show(ModelMap model);

    public String findReservaById(BigInteger id, ModelMap model);

    public void saveReserva(Reservas reservas);

    public void deleteReservaById(BigInteger id);

    public void updateReserva(Reservas reservasNew);
}
