package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "Alergenos")
public class Alergeno implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAlergeno;

    @Column(nullable = false)
    private String nombre;
    @Column(nullable = true)
    private String icono;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "PlatosAlergenos",
            joinColumns = { @JoinColumn(name = "idAlergeno") },
            inverseJoinColumns = { @JoinColumn(name = "idCarta")})
    private List<Plato> platos;

}
