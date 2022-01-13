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
@Table(name = "Carta")
public class Carta implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCarta;

    @Column(nullable = false)
    private String nombre;
    @Column(nullable = true)
    private String url_img;
    @Column(nullable = false)
    private boolean usaIMG;
    @Column(nullable = false)
    private boolean visible;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "CategoriaPlatos")
    private List<Categoria> categories;

    /*
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idRestaurante", referencedColumnName = "idRestaurante")
    private com.example.prueba_thymeleaf.entities.Categoria categoria;
    */

}
