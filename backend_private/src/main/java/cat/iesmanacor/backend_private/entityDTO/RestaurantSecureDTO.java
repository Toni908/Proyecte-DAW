package cat.iesmanacor.backend_private.entityDTO;

import cat.iesmanacor.backend_private.controller.CardController;
import cat.iesmanacor.backend_private.entities.*;

import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigInteger;
import java.util.List;

public class RestaurantSecureDTO {
    private BigInteger id_restaurante;

    @NotNull(message = "nombre cant be null")
    @Size(min=2, max=40, message = "Length of the name must be between 2 and 30")
    @Pattern(regexp = "^[A-Za-z][a-z]+(?:[ ]+[A-Za-z][a-z]+)*$") // UPPERCASE THE FIRST LETTER AND SPACE ANOTHER UPPERCASE
    private String nombre;

    private int dies_anticipacion_reservas;

    private long telefono_restaurante;

    Double longitud;

    Double latitud;

    @NotNull
    private Localidad localidad;

    @NotNull
    private Membresia membresia;

    @NotNull
    private Useracount useracount;

    @NotNull
    String direccion;

    @NotNull
    Long aforo;

    boolean visible;

    private List<Carta> cartas;

    private List<Periodo> periodos;

    @Transient
    public String getPhotosImagePath() {
        if (id_restaurante == null) return null;
        return "/restaurantes-photos/"+ id_restaurante + "/";
    }

    public BigInteger getId_restaurante() {
        return id_restaurante;
    }

    public void setId_restaurante(BigInteger id_restaurante) {
        this.id_restaurante = id_restaurante;
    }

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

    public Localidad getLocalidad() {
        return localidad;
    }

    public void setLocalidad(Localidad localidad) {
        this.localidad = localidad;
    }

    public Membresia getMembresia() {
        return membresia;
    }

    public void setMembresia(Membresia membresia) {
        this.membresia = membresia;
    }

    public Useracount getUseracount() {
        return useracount;
    }

    public void setUseracount(Useracount useracount) {
        this.useracount = useracount;
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

    public boolean isVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }

    public List<Carta> getCartas() {
        return cartas;
    }

    public void setCartas(List<Carta> cartas) {
        this.cartas = cartas;
    }

    public List<Periodo> getPeriodos() {
        return periodos;
    }

    public void setPeriodos(List<Periodo> periodos) {
        this.periodos = periodos;
    }

    public String getUrl() {
        if (nombre == null) return null;
        return "https://"+ CardController.urlw+"/restaurant/"+ nombre;
    }
}
