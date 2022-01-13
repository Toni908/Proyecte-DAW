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
@Table(name = "platos")
public class Plato implements Serializable {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id_plato;

        @Column(nullable = false)
        private String nombre;
        private String descripcion;
        private float precio;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "id_categoria_plato", referencedColumnName = "id_categoria")
        private Categoria categoria;

        @OneToMany(fetch = FetchType.LAZY)
        @JoinColumn(name="id_ingrediente")
        private List<Ingrediente> ingredientes;

        @ManyToMany(cascade = CascadeType.ALL)
        @JoinTable(name = "platos_alergenos",
                joinColumns = { @JoinColumn(name = "id_plato") },
                inverseJoinColumns = { @JoinColumn(name = "id_alergeno")})
        private List<Alergeno> alergenos;

}
