package cat.iesmanacor.backend_private.configuration;

import cat.iesmanacor.backend_private.entities.Useracount;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;



@Component("Interceptor")
public class AuthInterceptor implements HandlerInterceptor {
    private static final Logger log = (Logger) LoggerFactory.getLogger(AuthInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception{
        log.info("[preHandle]["+ request + "]" + "[" + request.getMethod() + "]" + request.getRequestURI());
        HttpSession session = request.getSession(false);
        try{
            Useracount user = (Useracount) session.getAttribute("user");
        }catch (NullPointerException e){
            response.sendRedirect("/error/401/");
            return false;
        }

        String url = request.getRequestURL().toString();


        return true;
    }
}
