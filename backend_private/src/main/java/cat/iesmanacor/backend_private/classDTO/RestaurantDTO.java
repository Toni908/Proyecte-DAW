package cat.iesmanacor.backend_private.classDTO;

import cat.iesmanacor.backend_private.entities.Localidad;
import cat.iesmanacor.backend_private.entities.Municipios;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class RestaurantDTO {

    private String nombre;
    private int dies_anticipacion_reservas;
    private long telefono_restaurante;
    private Localidad localidad;
    private Municipios municipios;
    private MultipartFile image;
}
