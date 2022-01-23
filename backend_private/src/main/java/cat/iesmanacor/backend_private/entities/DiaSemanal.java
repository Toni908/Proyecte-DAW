package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "dia_semanal")
public class DiaSemanal implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_dia_semanal")
    private Long id_dia_semanal;

    @Column(nullable = false)
    @NotNull(message = "no puede estar vacio")
    @Min(1)
    private int inicio;

    @Column(name = "final", nullable = false)
    @NotNull(message = "no puede estar vacio")
    @Min(1)
    private int finall;

    @OneToMany(mappedBy = "diaSemanal")
    private List<DiaSemanalPeriodo> diaSemanalPeriodo;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "dia_semanal_horario",
            joinColumns = { @JoinColumn(name = "id_dia_semanal") },
            inverseJoinColumns = { @JoinColumn(name = "id_horario")})
    private List<Horario> horarios;
}
