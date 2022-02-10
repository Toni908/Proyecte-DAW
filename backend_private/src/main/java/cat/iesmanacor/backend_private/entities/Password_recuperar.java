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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    @NotNull(message = "id_user cant be null")
    private BigInteger id_user;

    @Column(name = "password")
    @NotNull(message = "password cant be null")
    private String password;

    @Column(name = "codigo")
    @NotNull(message = "codigo cant be null")
    private BigInteger codigo;
}
