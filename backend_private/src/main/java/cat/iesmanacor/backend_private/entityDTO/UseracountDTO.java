package cat.iesmanacor.backend_private.entityDTO;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigInteger;

@Data
@ToString
public class UseracountDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id_user;

    @NotNull(message = "nombre_usuario cant be null")
    @Size(min=2, max=40, message = "Length of the name must be between 2 and 40")
    @Pattern(regexp = "^[^ª!\"·$%&/()=?¿\\\\|@#~½¬{\\[\\]}Ç*+\\-`'¡º<>;,:._]*$",message = "Cant use specials characters")
    private String nombre_usuario;

    private long telefono;

    @NotNull(message = "nombre cant be null")
    @Pattern(regexp = "^[^ª!\"·$%&/()=?¿\\\\|@#~½¬{\\[\\]}Ç*+\\-`'¡º<>;,:._]*$",message = "Cant use specials characters")
    private String nombre;

    @NotNull(message = "cant be null")
    @Pattern(regexp = "^[^ª!\"·$%&/()=?¿\\\\|@#~½¬{\\[\\]}Ç*+\\-`'¡º<>;,:._]*$",message = "Cant use specials characters")
    private String apellido1;

    @Pattern(regexp = "^[^ª!\"·$%&/()=?¿\\\\|@#~½¬{\\[\\]}Ç*+\\-`'¡º<>;,:._]*$",message = "Cant use specials characters")
    private String apellido2;


    public UseracountDTO(String nombre_usuario, long telefono, String nombre, String apellido1, String apellido2) {
        this.nombre_usuario = nombre_usuario;
        this.telefono = telefono;
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
    }

    public UseracountDTO(BigInteger id_user, String nombre_usuario, long telefono, String nombre, String apellido1, String apellido2) {
        this.id_user = id_user;
        this.nombre_usuario = nombre_usuario;
        this.telefono = telefono;
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
    }

    public UseracountDTO() {

    }

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

    public long getTelefono() {
        return telefono;
    }

    public void setTelefono(long telefono) {
        this.telefono = telefono;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido1() {
        return apellido1;
    }

    public void setApellido1(String apellido1) {
        this.apellido1 = apellido1;
    }

    public String getApellido2() {
        return apellido2;
    }

    public void setApellido2(String apellido2) {
        this.apellido2 = apellido2;
    }
}