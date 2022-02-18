package cat.iesmanacor.backend_private.entities;

import lombok.Data;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@ToString
@Embeddable
public class CodesId implements Serializable {

    @Column(name = "types")
    @NotNull(message = "type cant be null")
    private String types;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_user")
    private Useracount useracount;

    public CodesId (Useracount useracount, String types) {
        this.useracount = useracount;
        this.types = types;
    }
    public CodesId(){}
}
