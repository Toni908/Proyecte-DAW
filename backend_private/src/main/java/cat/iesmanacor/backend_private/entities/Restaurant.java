package cat.iesmanacor.backend_private.entities;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="restaurante")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String population;
    private String type;
    private int categoryPrice;
}