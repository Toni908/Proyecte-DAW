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
@Table(name = "alergenos")
public class Alergeno implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_alergeno;

    @Column(nullable = false)
    private String nombre;
    private String icono;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "platos_alergenos",
            joinColumns = { @JoinColumn(name = "id_alergeno") },
            inverseJoinColumns = { @JoinColumn(name = "id_plato")})
    private List<Plato> platos;

}
