package cat.iesmanacor.backend_private.entities;

import java.math.BigInteger;
import java.util.List;

public class ListImagesIsEmpty {
    List<Img> imgs;
    BigInteger id_restaurant;
    boolean isEmpty;

    public ListImagesIsEmpty (List<Img> imgs,BigInteger id_restaurant, boolean isEmpty) {
        this.imgs = imgs;
        this.id_restaurant = id_restaurant;
        this.isEmpty = isEmpty;
    }

    public BigInteger getId_restaurant() {
        return id_restaurant;
    }

    public void setId_restaurant(BigInteger id_restaurant) {
        this.id_restaurant = id_restaurant;
    }

    public List<Img> getImgs() {
        return imgs;
    }

    public boolean isEmpty() {
        return isEmpty;
    }

    public void setEmpty(boolean empty) {
        isEmpty = empty;
    }

    public void setImgs(List<Img> imgs) {
        this.imgs = imgs;
    }
}
