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
@Table(name = "carta")
public class Carta implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_carta")
    private Long id_carta;

    @Column(nullable = false)
    @NotNull(message = "cant be null")
    @Size(min=2, max=50, message = "debe tener entre 2 y 50 caracteres")
    private String nombre;
    @Column(nullable = false)
    @Size(min=2, max=50, message = "debe tener entre 2 y 50 caracteres")
    private String url_img;
    private boolean usa_img;
    private boolean visible;

    @OneToMany(fetch = FetchType.LAZY,  mappedBy = "carta")
    private List<Categoria> categories;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_restaurante")
    private Restaurant restaurant;

}
