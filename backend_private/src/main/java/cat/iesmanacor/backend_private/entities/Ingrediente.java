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
@Table(name = "ingredientes")
public class Ingrediente implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_ingrediente;

    @Column(nullable = false)
    private String nombre;

    /*
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="platos_ingredientes",
            joinColumns = { @JoinColumn(name = "id_ingrediente") },
            inverseJoinColumns = { @JoinColumn(name = "id_plato")})
    private List<Plato> platos;
     */
}
