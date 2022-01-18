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
@Table(name = "carta")
public class Carta implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_carta")
    private Long id_carta;

    @Column(nullable = false)
    private String nombre;
    private String url_img;
    private boolean usa_img;
    private boolean visible;

    @OneToMany(fetch = FetchType.LAZY,  mappedBy = "carta")
    private List<Categoria> categories;

}
