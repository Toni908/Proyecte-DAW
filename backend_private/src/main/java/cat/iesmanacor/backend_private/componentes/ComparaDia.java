package cat.iesmanacor.backend_private.componentes;

import cat.iesmanacor.backend_private.entities.Horario;

import java.util.*;

public class ComparaDia implements Comparator<Horario> {

    String[] dias = {"Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"};

    @Override
    public int compare(Horario d1, Horario d2) {
        int nd1 = Arrays.asList(dias).indexOf(d1.getDay());
        int nd2 = Arrays.asList(dias).indexOf(d2.getDay());
        return nd1 - nd2;
    }
}

