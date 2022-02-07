package cat.iesmanacor.backend_private.componentes;

import cat.iesmanacor.backend_private.entities.Useracount;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
}
