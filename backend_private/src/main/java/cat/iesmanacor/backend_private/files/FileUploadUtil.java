package cat.iesmanacor.backend_private.files;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class FileUploadUtil {
    public static void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) {
        Path uploadPath = Paths.get(uploadDir);

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
        Path uploadPath = Paths.get(uploadDir);
        try {
            if (Files.exists(uploadPath)) {
                Path path = Paths.get(uploadDir+"/"+filename);
                Files.delete(path);
            }
        } catch (Exception e) {
            // ERROR
            System.out.println("Error on deleteImg FILEUPLOADUTIL");
        }
    }
}
