package cat.iesmanacor.backend_private.controllersImplements;

import cat.iesmanacor.backend_private.entities.Img;
import org.springframework.ui.ModelMap;

import java.math.BigInteger;

public interface ImgController {
    public String show(ModelMap model);

    public String findImgById(BigInteger id, ModelMap model);

    public void saveImg(Img img);

    public void deleteImgById(BigInteger id);

    public void updateImg(Img imgNew);
}
