package cat.iesmanacor.backend_private.files;

import cat.iesmanacor.backend_private.controller.ImgController;
import com.luciad.imageio.webp.WebPWriteParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.FileImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Configuration
public class FileUploadUtil {

    @Autowired
    Environment environment;

    public static String url;

    public static boolean saveFile(String uploadDir, String fileName, MultipartFile multipartFile) {
        Path uploadPath = Paths.get(url+"/"+uploadDir);
        if (!Files.exists(uploadPath)) {
            try {
                Files.createDirectories(uploadPath);
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ioe) {
            System.out.println(ioe.getMessage());
        }

        try {
            BufferedImage image = ImageIO.read(new File(String.valueOf(uploadPath.resolve(fileName))));
            ImageIO.write(image, "webp", new File(uploadPath + "/" + reFormateFormatImage(fileName)));
            deleteImg(uploadDir,fileName);
//            ImageIO.write(image, "webp", new File(uploadPath + "/" + "image.webp"));
            return true;
        } catch (IOException e) {
            deleteImg(uploadDir,fileName);
            System.out.println(e.getMessage());
            return false;
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
            System.out.println("Error on deleteImg");
        }
    }

    public static String reFormateFormatImage(String image) {
        String[] name = image.split("\\.");
        return name[0]+".webp";
    }
}
