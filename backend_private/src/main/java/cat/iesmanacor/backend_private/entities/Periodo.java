package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "periodo")
public class Periodo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_periodo")
    private Long id_periodo;

    @Column(nullable = false)
    @NotNull(message = "cant be null")
    @Size(min=2, max=254, message = "debe tener entre 2 y 254 caracteres")
    private String nombre;

    @Column(nullable = false)
    @NotNull(message = "no puede estar vacio")
    private Date fecha_inicio;

    @Column( nullable = false)
    @NotNull(message = "no puede estar vacio")
    private Date fecha_fin;

    @Column( nullable = false)
    @NotNull(message = "no puede estar vacio")
    private int capacidad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_restaurante")
    private Restaurant restaurant;

    @OneToMany(fetch = FetchType.LAZY,  mappedBy = "periodo")
    private List<Horario> horarios;

}
