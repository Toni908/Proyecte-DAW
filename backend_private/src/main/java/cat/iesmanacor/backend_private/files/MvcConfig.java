package cat.iesmanacor.backend_private.files;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Autowired
    Environment environment;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        System.out.println(environment.getProperty("img.file.destiny"));
        exposeDirectory("restaurantes-photos",registry);
    }

    public void exposeDirectory(String dirname, ResourceHandlerRegistry registry) {
        String uploadPath = "C:\\Users\\Andres\\Documents\\Proyecte-DAW\\restaurantes-photos";

        if (dirname.startsWith("../")) dirname = dirname.replace("../","");

        registry.addResourceHandler("/",dirname+"/**").addResourceLocations("file:/"+uploadPath+"/");
    }
}
