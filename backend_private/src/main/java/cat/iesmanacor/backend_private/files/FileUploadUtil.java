package cat.iesmanacor.backend_private.files;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Configuration
public class FileUploadUtil {

    @Autowired
    Environment environment;

    public static String url;

    public static void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) {
        Path uploadPath = Paths.get(url+"/"+uploadDir);

        if (!Files.exists(uploadPath)) {
            try {
                Files.createDirectories(uploadPath);
            } catch (Exception e) {
                //
            }
        }


        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ioe) {
            //
        }
    }

    public static void deleteImg(String uploadDir, String filename) {
        Path uploadPath = Paths.get(url+"/"+uploadDir);
        try {
            if (Files.exists(uploadPath)) {
                Path path = Paths.get(url+"/"+uploadDir+"/"+filename);
                Files.delete(path);
            }
        } catch (Exception e) {
            // ERROR
            System.out.println("Error on deleteImg FILEUPLOADUTIL");
        }
    }
}
