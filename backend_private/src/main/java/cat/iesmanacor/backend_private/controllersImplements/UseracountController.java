package cat.iesmanacor.backend_private.controllersImplements;

import cat.iesmanacor.backend_private.entities.Useracount;
import org.springframework.ui.ModelMap;

import java.math.BigInteger;


public interface UseracountController {
    public String show(ModelMap model);

    public String getUseracountById(BigInteger id, ModelMap model);

    public void saveUseracount(Useracount useracount);

    public void deleteUseracountById(BigInteger id);

    public void updateUseracount(Useracount useracountNew);
}
