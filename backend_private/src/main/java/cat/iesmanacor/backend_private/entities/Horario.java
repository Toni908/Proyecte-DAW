package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

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
    private Timestamp hora_inicio;

    @Column(nullable = false)
    @NotNull(message = "no puede estar vacio")
    private Timestamp hora_fin;

    @Column(nullable = false)
    @NotNull(message = "no puede estar vacio")
    @Min(value = -1 , message = "Value should be greater then then equal to -1")
    @Max(value = 7 , message = "Value should be less then then equal to 7")
    private int day;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="periodo_horarios",
            joinColumns = { @JoinColumn(name = "id_horario") },
            inverseJoinColumns = { @JoinColumn(name = "id_periodo")})
    private List<Periodo> periodos;

}
