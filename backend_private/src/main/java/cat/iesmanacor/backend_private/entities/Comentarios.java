package cat.iesmanacor.backend_private.entities;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigInteger;

@Entity
@Table(name = "comentarios")
public class Comentarios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_comentario")
    private BigInteger id_comentario;

    @Column(name = "comentario")
    @NotNull
    @Size(min = 0,max = 254)
    private String comentario;

    @Column(name = "valoracion_sitio")
    private int valoracion_sitio;

    @Column(name = "valoracion_servicio")
    private int valoracion_servicio;

    @Column(name = "valoracion_comida")
    private int valoracion_comida;

    @OneToOne(optional = false)
    @JoinColumn(name = "id_reserva")
    @NotNull(message = "id_membresia cant be null")
    private Reservas reserva;

    public Comentarios(String comentario, int valoracionSitio, int valoracionServicio, int valoracionComida, Reservas reserva) {
        this.comentario = comentario;
        this.valoracion_sitio = valoracionSitio;
        this.valoracion_servicio = valoracionServicio;
        this.valoracion_comida = valoracionComida;
        this.reserva = reserva;
    }

    public Comentarios(BigInteger id_comentario, String comentario, int valoracionSitio, int valoracionServicio, int valoracionComida, Reservas reserva) {
        this.id_comentario = id_comentario;
        this.comentario = comentario;
        this.valoracion_sitio = valoracionSitio;
        this.valoracion_servicio = valoracionServicio;
        this.valoracion_comida = valoracionComida;
        this.reserva = reserva;
    }

    public Comentarios(){}

    public BigInteger getId_comentario() {
        return id_comentario;
    }

    public void setId_comentario(BigInteger id_comentario) {
        this.id_comentario = id_comentario;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public int getValoracion_sitio() {
        return valoracion_sitio;
    }

    public void setValoracion_sitio(int valoracion_sitio) {
        this.valoracion_sitio = valoracion_sitio;
    }

    public int getValoracion_servicio() {
        return valoracion_servicio;
    }

    public void setValoracion_servicio(int valoracion_servicio) {
        this.valoracion_servicio = valoracion_servicio;
    }

    public int getValoracion_comida() {
        return valoracion_comida;
    }

    public void setValoracion_comida(int valoracion_comida) {
        this.valoracion_comida = valoracion_comida;
    }

    public Reservas getReserva() {
        return reserva;
    }

    public void setReserva(Reservas reserva) {
        this.reserva = reserva;
    }
}
