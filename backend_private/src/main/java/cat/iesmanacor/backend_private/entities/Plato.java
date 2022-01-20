package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
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
        @NotNull(message = "nombre cant be null")
        @Size(min=2, max=50, message = "debe tener entre 2 y 50 caracteres")
        private String nombre;
        @Column(nullable = false)
        @NotNull(message = "nombre cant be null")
        @Size(min=2, max=100, message = "debe tener entre 2 y 100 caracteres")
        private String descripcion;
        @Column(nullable = false)
        @NotNull(message = "nombre cant be null")
        private float precio;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "id_categoria")
        private Categoria categoria;

        @ManyToMany(fetch = FetchType.LAZY)
        @JoinTable(name="platos_ingredientes",
                joinColumns = { @JoinColumn(name = "id_plato") },
                inverseJoinColumns = { @JoinColumn(name = "id_ingrediente")})
        private List<Ingrediente> ingredientes;

        @ManyToMany(cascade = CascadeType.ALL)
        @JoinTable(name = "platos_alergenos",
                joinColumns = { @JoinColumn(name = "id_plato") },
                inverseJoinColumns = { @JoinColumn(name = "id_alergeno")})
        private List<Alergeno> alergenos;

}
