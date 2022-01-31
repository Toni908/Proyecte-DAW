package cat.iesmanacor.backend_private.entities;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;
import java.sql.Date;
import java.sql.Timestamp;

@Data
@Entity
@ToString
@Table(name = "membresia")
public class Membresia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_membresia")
    private BigInteger id_membresia;

    @Column(name = "fecha_inicio")
    private Date fecha_inicio;

    @Column(name = "fecha_fin")
    private Date fecha_fin;

    @ManyToOne(optional = false)
    @JoinColumn(name = "num_factura")
    @NotNull(message = "num_factura cant be null")
    private Factura factura;

    public Membresia(BigInteger id_membresia, Date fecha_inicio, Date fecha_fin, Factura factura) {
        this.id_membresia = id_membresia;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.factura = factura;
    }

    public Membresia() {

    }

    public Membresia(Date fecha_inicio, Date fecha_fin, Factura factura) {
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.factura = factura;
    }
}