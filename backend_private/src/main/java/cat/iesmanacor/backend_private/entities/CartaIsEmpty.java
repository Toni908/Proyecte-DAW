package cat.iesmanacor.backend_private.entities;

import lombok.Data;

@Data
public class CartaIsEmpty {

    Restaurant restaurant;
    boolean isEmpty;
    boolean hasVisible;

    public CartaIsEmpty(Restaurant restaurant, boolean isEmpty, boolean hasVisible) {
        this.restaurant = restaurant;
        this.isEmpty = isEmpty;
        this.hasVisible = hasVisible;
    }

    public CartaIsEmpty () {
    }
}
