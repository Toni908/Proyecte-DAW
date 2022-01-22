package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "periodo")
public class Periodo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_periodo")
    private Long id_periodo;

    @Column(nullable = false)
    @NotNull(message = "no puede estar vacio")
    private Timestamp fecha_inicio;

    @Column( nullable = false)
    @NotNull(message = "no puede estar vacio")
    private Timestamp fecha_fin;

}
