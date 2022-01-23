package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "dia_semanal_periodo")
public class DiaSemanalPeriodo implements Serializable {
    @EmbeddedId
    private DiaSemanalPeriodoPKId diaSemanalPeriodoPKId;
    @ManyToOne
    @MapsId("id_periodo")
    @JoinColumn(name="id_periodo")
    private Periodo periodo;
    @ManyToOne
    @MapsId("id_dia_semanal")
    @JoinColumn(name="id_dia_semanal")
    private DiaSemanal diaSemanal;
    @OneToOne
    @JoinColumn(name = "id_restaurante")
    private Restaurant restaurant;
}
