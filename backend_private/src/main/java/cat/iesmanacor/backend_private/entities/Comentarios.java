package cat.iesmanacor.backend_private.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigInteger;

@Data
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

    @Column(name = "valoracion")
    @NotNull
    private float valoracion;

    @OneToOne(optional = false)
    @JoinColumn(name = "id_reserva")
    @NotNull(message = "id_membresia cant be null")
    private Reservas reserva;

    public Comentarios(BigInteger id_comentario, String comentario, float valoracion, Reservas reserva) {
        this.id_comentario = id_comentario;
        this.comentario = comentario;
        this.valoracion = valoracion;
        this.reserva = reserva;
    }
    public Comentarios(String comentario, float valoracion, Reservas reserva) {
        this.comentario = comentario;
        this.valoracion = valoracion;
        this.reserva = reserva;
    }
    public Comentarios(){}
}
