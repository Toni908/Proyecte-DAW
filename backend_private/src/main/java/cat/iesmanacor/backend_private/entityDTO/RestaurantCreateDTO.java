package cat.iesmanacor.backend_private.entityDTO;

import cat.iesmanacor.backend_private.entities.Localidad;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigInteger;

public class RestaurantCreateDTO {

    @NotNull(message = "nombre cant be null")
    @Size(min=2, max=40, message = "Length of the name must be between 2 and 30")
    @Pattern(regexp = "^[A-Za-z][a-z]+(?:[ ]+[A-Za-z][a-z]+)*$") // UPPERCASE THE FIRST LETTER AND SPACE ANOTHER UPPERCASE
    private String nombre;

    private int dies_anticipacion_reservas;

    private long telefono_restaurante;

    Double longitud;

    Double latitud;

    @NotNull
    String direccion;

    @NotNull
    Long aforo;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getDies_anticipacion_reservas() {
        return dies_anticipacion_reservas;
    }

    public void setDies_anticipacion_reservas(int dies_anticipacion_reservas) {
        this.dies_anticipacion_reservas = dies_anticipacion_reservas;
    }

    public long getTelefono_restaurante() {
        return telefono_restaurante;
    }

    public void setTelefono_restaurante(long telefono_restaurante) {
        this.telefono_restaurante = telefono_restaurante;
    }

    public Double getLongitud() {
        return longitud;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public Double getLatitud() {
        return latitud;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Long getAforo() {
        return aforo;
    }

    public void setAforo(Long aforo) {
        this.aforo = aforo;
    }
}