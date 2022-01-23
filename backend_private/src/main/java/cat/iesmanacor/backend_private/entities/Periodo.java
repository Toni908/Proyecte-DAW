package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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
    @NotNull(message = "no puede estar vacio")
    private Date fecha_inicio;

    @Column( nullable = false)
    @NotNull(message = "no puede estar vacio")
    private Date fecha_fin;

    @OneToMany(mappedBy = "periodo")
    private List<DiaSemanalPeriodo> diaSemanalPeriodo;

}
