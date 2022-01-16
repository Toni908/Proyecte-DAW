package cat.iesmanacor.backend_private.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@Entity
@Table(name = "factura")
public class Factura {
    @Id
    @Column(name = "num_factura")
    @NotNull(message = "num_factura cant be null")
    @Pattern(regexp = "^[^ª!\"·$%&/()=?¿\\\\|@#~½¬{\\[\\]}Ç*+\\-`'¡º<>;,:._]*$",message = "Cant use specials characters")
    private String num_factura;

    @Column(name = "direccion")
    @NotNull(message = "Direccion cant be null")
    private String direccion;

    @Column(name = "importe")
    @NotNull(message = "Importe cant be null")
    @DecimalMin(value = "0.01", message = "Min of importe is 0.01")
    private float importe;

    public Factura(String num_factura, String direccion, float importe) {
        this.num_factura = num_factura;
        this.direccion = direccion;
        this.importe = importe;
    }

    public Factura() {

    }
}