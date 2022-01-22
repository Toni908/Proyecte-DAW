package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "horario")
public class Horario {

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

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "dia_semanal_horario",
            joinColumns = { @JoinColumn(name = "id_horario") },
            inverseJoinColumns = { @JoinColumn(name = "id_dia_semanal")})
    private List<DiaSemanal> diaSemanals;
}
