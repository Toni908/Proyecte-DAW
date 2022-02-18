package cat.iesmanacor.backend_private.entityDTO;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigInteger;

public class SimpleUserDTO {

    private BigInteger id_user;

    @NotNull(message = "nombre_usuario cant be null")
    @Size(min=2, max=40, message = "Length of the name must be between 2 and 40")
    @Pattern(regexp = "^[^ª!\"·$%&/()=?¿\\\\|@#~½¬{\\[\\]}Ç*+\\-`'¡º<>;,:._]*$",message = "Cant use specials characters")
    private String nombre_usuario;


    @NotNull(message = "nombre cant be null")
    @Pattern(regexp = "^[^ª!\"·$%&/()=?¿\\\\|@#~½¬{\\[\\]}Ç*+\\-`'¡º<>;,:._]*$",message = "Cant use specials characters")
    private String nombre;

    public BigInteger getId_user() {
        return id_user;
    }

    public void setId_user(BigInteger id_user) {
        this.id_user = id_user;
    }

    public String getNombre_usuario() {
        return nombre_usuario;
    }

    public void setNombre_usuario(String nombre_usuario) {
        this.nombre_usuario = nombre_usuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
