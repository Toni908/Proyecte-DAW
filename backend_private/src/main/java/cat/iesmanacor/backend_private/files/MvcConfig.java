package cat.iesmanacor.backend_private.files;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        exposeDirectory("restaurantes-photos",registry);
    }

    public void exposeDirectory(String dirname, ResourceHandlerRegistry registry) {
        String uploadPath = "C:\\Users\\Andres\\Documents\\Proyecte-DAW\\restaurantes-photos";

        if (dirname.startsWith("../")) dirname = dirname.replace("../","");

        registry.addResourceHandler("/",dirname+"/**").addResourceLocations("file:/"+uploadPath+"/");
    }
}
