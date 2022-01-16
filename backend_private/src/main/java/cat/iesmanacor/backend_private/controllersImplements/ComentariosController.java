package cat.iesmanacor.backend_private.controllersImplements;

import cat.iesmanacor.backend_private.entities.Comentarios;
import org.springframework.ui.ModelMap;

import java.math.BigInteger;

public interface ComentariosController {
    public String show(ModelMap model);

    public String findComentarioById(BigInteger id, ModelMap model);

    public void saveComentario(Comentarios comentarios);

    public void deleteComentarioById(BigInteger id);

    public void updateComentario(Comentarios comentariosNew);
}
