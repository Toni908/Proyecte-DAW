package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "password_recuperar")
public class Password_recuperar {

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_user")
    private Useracount useracount;

    @Id
    @Column(name = "codigo")
    @NotNull(message = "codigo cant be null")
    private BigInteger codigo;
}
