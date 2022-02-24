package cat.iesmanacor.backend_private.files;

import cat.iesmanacor.backend_private.controller.ImgController;
import com.lowagie.text.DocumentException;
import com.luciad.imageio.webp.WebPWriteParam;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
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
            image = Scalr.resize(image, 800);
//            image = resizeImage(image, 1000, 700);
            ImageIO.write(image, "webp", new File(uploadPath + "/" + reFormateFormatImage(fileName)));
            deleteImg(uploadDir,fileName);
            return true;
        } catch (IOException e) {
            deleteImg(uploadDir,fileName);
            System.out.println(e.getMessage());
            return false;
        }
    }

    public static BufferedImage resizeImage(BufferedImage originalImage, int targetWidth, int targetHeight) {
        Image resultingImage = originalImage.getScaledInstance(targetWidth, targetHeight, Image.SCALE_FAST);
        BufferedImage outputImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.SCALE_FAST);
        outputImage.getGraphics().drawImage(resultingImage, 0, 0, null);
        return outputImage;
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


    // PDF

    public static boolean generatePdfFromHtml(String html, String id) {
        String outputFolder = url+"/"+id+"/"+id+".pdf";
        try {
            OutputStream outputStream = new FileOutputStream(outputFolder);

            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(html);
            renderer.layout();
            renderer.createPDF(outputStream);

            outputStream.close();
            return true;
        } catch (IOException | DocumentException e) {
            //
            return false;
        }
    }
}
