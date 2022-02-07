package cat.iesmanacor.backend_private.componentes;

import cat.iesmanacor.backend_private.entities.Useracount;
import cat.iesmanacor.backend_private.services.UseracountService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Optional;

public class User {

    public static Useracount getUser(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        Useracount user = new Useracount();
        try{
            user = (Useracount) session.getAttribute("user");
        }catch (NullPointerException e){
            return user;
        }
        return user;
    }

    public static boolean isUserCorrect(Useracount useracount, UseracountService useracountService) {
        if (useracount!=null) {
            if (useracount.getId_user() != null) {
                Optional<Useracount> useracountDDBB = useracountService.findUseracountById(useracount.getId_user());
                if (useracountDDBB.isPresent()) {
                    if (useracountDDBB.get().equals(useracount)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
