package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Img;
import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.files.FileUploadUtil;
import cat.iesmanacor.backend_private.services.ImgService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Controller
public class ImgControllerImpl {

    @Autowired
    ImgService imgService;

    @Autowired
    RestaurantService restaurantService;

    //////////////         ROUTES        ////////////////////


    @RequestMapping(value = "/imagen/save",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String save(@ModelAttribute @Valid Img img, BindingResult errors, ModelMap model, @RequestParam("image") MultipartFile multipartFile) throws IOException {
        inicializeModelMap(model);
        if (errors.hasErrors()) {
            return "redirect:/imagen/create";
        }

        if (img.getId_img()!=null) {
            Optional<Img> requestImg = imgService.findImgById(img.getId_img());
            if (requestImg.isPresent()) {
                return "redirect:/home";
            }
        }
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));

        Img imgSumbited = saveImg(img);

        fileName = imgSumbited.getId_img()+fileName;
        img.setUrl(fileName);
        String uploadDir = "restaurantes-photos/"+img.getRestaurant().getId_restaurante();
        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
        return "redirect:/restaurant/update/"+img.getRestaurant().getId_restaurante();
    }

    @RequestMapping(value = "/imagen/saveMultiple",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String saveMultiple(@RequestParam("saveMultiple") List<MultipartFile> multipartFile, ModelMap model, @RequestParam("idRestaurant") BigInteger id) throws IOException {
        inicializeModelMap(model);

        if (!multipartFile.isEmpty()) {
            for (MultipartFile url : multipartFile) {
                if (checkUrlisEmpty(url.getOriginalFilename())) {
                    if (id!=null) {
                        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
                        restaurant.ifPresent(value -> saveImageRestaurant(url, value));
                    }
                }
            }
            if (id!=null) {
                return "redirect:/restaurant/update/" + id;
            }
        }
        return "redirect:/home";
    }

    @RequestMapping(value = "/imagen/delete/{id}", method = RequestMethod.GET, produces = "application/json")
    public RedirectView delete(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Img> img = imgService.findImgById(id);
            if (img.isPresent()) {
                deleteImgById(id);
            } else {
                model.addAttribute("error", "FACTURA NOT FOUNDED");
            }
        }
        return new RedirectView("/imagenes");
    }


    /* ------------------------------------------ */


    public Img saveImg(Img img) {
        if (img != null) {
            return imgService.saveImg(img);
        }
        return null;
    }

    public void deleteImgById(BigInteger id) {
        Optional<Img> img = imgService.findImgById(id);
        if (img.isPresent()) {
            imgService.deleteImg(id);
            deleteImgOnDirectory(img.get().getUrl(),"restaurantes-photos");
        }
    }

    public void inicializeModelMap(ModelMap model) {
        model.remove("img");
        model.remove("imgs");
        model.remove("error");
    }

    public boolean checkUrlisEmpty(String url) {
        return imgService.findImgByUrl(url).isEmpty();
    }
    public void deleteImgOnDirectory(String filename, String directory) {
        Path fileToDeletePath = Paths.get(directory+"/"+filename);
        try {
            Files.delete(fileToDeletePath);
        } catch (Exception e) {
            // ERROR
        }
    }

    public void saveImageRestaurant(MultipartFile multipartFile, Restaurant restaurant) {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        Img img = new Img();
        img.setRestaurant(restaurant);
        img.setUrl(fileName);
        try {
            if (checkUrlisEmpty(fileName)) {
                Img imgSumbited = imgService.saveImg(img);
                fileName = imgSumbited.getId_img() + fileName;
                if (checkUrlisEmpty(fileName)) {
                    imgSumbited.setUrl(fileName);
                    imgService.updateImg(imgSumbited);
                    String uploadDir = "restaurantes-photos/" + img.getRestaurant().getId_restaurante();
                    FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
                }
            }
        } catch (Exception e) {
            //
        }
    }
}
