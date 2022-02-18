package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;
import java.util.Random;

@Data
@NoArgsConstructor
@ToString
@Entity
@Table(name = "codes")
public class Codes {

    @EmbeddedId CodesId id;

    @JoinColumn(name = "codigo")
    private String codigo;

    public Codes(CodesId id, String codigo) {
        this.id = id;
        this.codigo = codigo;
    }

    public static String getRandomString(int length) {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < length) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        return salt.toString();
    }

    public CodesId getId() {
        return id;
    }

    public void setId(CodesId id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
}
