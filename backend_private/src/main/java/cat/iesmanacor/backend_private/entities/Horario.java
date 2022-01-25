package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Time;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "horario")
public class Horario implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_horario")
    private Long id_horario;

    @Column(nullable = false)
    @NotNull(message = "no puede estar vacio")
    private Time hora_inicio;

    @Column(nullable = false)
    @NotNull(message = "no puede estar vacio")
    private Time hora_fin;

    @Column(nullable = false)
    @NotNull(message = "no puede estar vacio")
    @Size(min=2, max=254, message = "debe tener entre 2 y 254 caracteres")
    private String day;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_periodo")
    private Periodo periodo;

}
