package cat.iesmanacor.backend_private.files;

import cat.iesmanacor.backend_private.componentes.QRCodeGenerator;
import cat.iesmanacor.backend_private.controller.CardController;
import cat.iesmanacor.backend_private.controller.RedSysController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
        FileUploadUtil.url = environment.getProperty("img.file.destiny.directory");
        QRCodeGenerator.paths = environment.getProperty("img.file.destiny.directory");
        RedSysController.urlw = environment.getProperty("web.url");
        CardController.urlw = environment.getProperty("web.url.front");
        registry
                .addResourceHandler("/restaurantes-photos/**")
                .addResourceLocations(environment.getProperty("img.file.destiny.directory.file"));
    }
}
