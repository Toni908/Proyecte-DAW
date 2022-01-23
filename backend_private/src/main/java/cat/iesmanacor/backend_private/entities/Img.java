package cat.iesmanacor.backend_private.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigInteger;

@Data
@Entity
@ToString
@Table(name = "img")
public class Img {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_img")
    BigInteger id_img;

    @Column(name="url")
    @Size(min = 1, max = 254)
    String url;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_restaurante")
    @NotNull(message = "id_restaurante cant be null")
    private Restaurant restaurant;

    public Img(BigInteger id_img, String url, Restaurant restaurant) {
        this.id_img = id_img;
        this.url = url;
        this.restaurant = restaurant;
    }

    public Img(String url, Restaurant restaurant) {
        this.url = url;
        this.restaurant = restaurant;
    }

    public Img() {}
}
