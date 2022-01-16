package cat.iesmanacor.backend_private.controllersImplements;

import cat.iesmanacor.backend_private.entities.Localidad;
import org.springframework.ui.ModelMap;

import java.math.BigInteger;

public interface LocalidadController {
    public String show(ModelMap model);

    public String findLocalidadById(BigInteger id, ModelMap model);

    public void saveLocalidad(Localidad localidad);

    public void deleteLocalidadById(BigInteger id);

    public void updateLocalidad(Localidad localidadNew);
}
