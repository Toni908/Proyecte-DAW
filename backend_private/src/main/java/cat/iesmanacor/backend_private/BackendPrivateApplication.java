package cat.iesmanacor.backend_private;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BackendPrivateApplication implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(BackendPrivateApplication.class, args);
    }
}
