package cat.iesmanacor.backend_private.files;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Objects;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Autowired
    Environment environment;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        FileUploadUtil.url = environment.getProperty("img.file.destiny");
        exposeDirectory(environment.getProperty("img.file.destiny"),registry);
    }

    public void exposeDirectory(String dirname, ResourceHandlerRegistry registry) {
        if (dirname.startsWith("../")) dirname = dirname.replace("../","");

        registry.addResourceHandler(dirname+"/**").addResourceLocations("file:/"+environment.getProperty("img.file.destiny")+"/");
    }
}
