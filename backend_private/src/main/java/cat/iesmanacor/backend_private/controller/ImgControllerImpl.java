package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Img;
import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.entities.Useracount;
import cat.iesmanacor.backend_private.files.FileUploadUtil;
import cat.iesmanacor.backend_private.services.ImgService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.io.File;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Controller
public class ImgControllerImpl {

    @Autowired
    ImgService imgService;

    @Autowired
    RestaurantService restaurantService;


    private static int num_images = 4;
    //////////////         ROUTES        ////////////////////


    @RequestMapping(value = "/imagen/save",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public RedirectView save(@ModelAttribute @Valid Img img, BindingResult errors, RedirectAttributes redir, @RequestParam("image") MultipartFile multipartFile) {
        if (errors.hasErrors()) {
            return new RedirectView("/home",false);
        }

        if (img.getId_img()!=null) {
            Optional<Img> requestImg = imgService.findImgById(img.getId_img());
            if (requestImg.isPresent()) {
                return new RedirectView("/home",true);
            }
        }
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));

        if (fileName.matches("^\\S*$")) {
            Img imgSumbited = saveImg(img);

            fileName = imgSumbited.getId_img() + fileName;
            img.setUrl(fileName);
            String uploadDir = ""+img.getRestaurant().getId_restaurante();
            FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
        } else {
            RedirectView redirectView = new RedirectView("/restaurant/update/"+img.getRestaurant().getId_restaurante(),true);
            redir.addFlashAttribute("error","El nombre de la imagen no debe de contener espacios");
            return redirectView;
        }
        return new RedirectView("/restaurant/update/"+img.getRestaurant().getId_restaurante(),false);
    }

    @RequestMapping(value = "/imagen/saveMultiple",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public RedirectView saveMultiple(@RequestParam("saveMultiple") List<MultipartFile> multipartFile, RedirectAttributes redir, @RequestParam("idRestaurant") BigInteger id) {
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);

        if (restaurant.isPresent()) {
            if (imgService.findImgFromRestaurantId(restaurant.get().getId_restaurante()).size()+ multipartFile.size() <= num_images) {
                if (!multipartFile.isEmpty()) {
                    for (MultipartFile url : multipartFile) {
                        if (checkUrlisEmpty(url.getOriginalFilename())) {
                            if (id != null) {
                                if (StringUtils.cleanPath(Objects.requireNonNull(url.getOriginalFilename())).matches("^\\S*$")) {
                                    restaurant.ifPresent(value -> saveImageRestaurant(url, value));
                                } else {
                                    RedirectView redirectView = new RedirectView("/restaurant/update/" + id, true);
                                    redir.addFlashAttribute("error", "El nombre de la imagen no debe de contener espacios");
                                    return redirectView;
                                }
                            }
                        }
                    }
                }
            } else {
                RedirectView redirectView = new RedirectView("/restaurant/update/" + id, true);
                redir.addFlashAttribute("error", "No puedes añadir mas imagenes, el limite son "+num_images);
                return redirectView;
            }
            return new RedirectView("/restaurant/update/"+id,false);
        }
        return new RedirectView("/home");
    }

    @RequestMapping(value = "/imagen/delete/{id}", method = RequestMethod.GET)
    @Transactional
    public RedirectView delete(@PathVariable(value="id") BigInteger id) {
        // COMPROVACION QUE REALMENTE EL USUARIO ES EL PERTENECEDOR DE LA IMAGEN

        RedirectView redirectView = new RedirectView("/restaurant/update/"+id,true);

        if (id!=null) {
            Optional<Img> img = imgService.findImgById(id);
            if (img.isPresent()) {
                imgService.deleteImg(img.get().getId_img());
                String uploadDir = ""+img.get().getRestaurant().getId_restaurante();
                FileUploadUtil.deleteImg(uploadDir, img.get().getUrl());
            }
        }

        return redirectView;
    }


    @RequestMapping(value = "/imagen/delete", method = RequestMethod.POST)
    @Transactional
    public RedirectView deleteMultiple(@RequestParam("idRestaurante") BigInteger idRestaurante, @RequestParam(value="images") List<BigInteger> ids) {
        // COMPROVACION QUE REALMENTE EL USUARIO ES EL PERTENECEDOR DE LA IMAGEN
        RedirectView redirectView = new RedirectView("/restaurant/update/"+idRestaurante,true);

        if (ids!=null) {
            for (BigInteger singleId : ids) {
                Optional<Img> imgSelected = imgService.findImgById(singleId);
                if (imgSelected.isPresent()) {
                    imgService.deleteImg(imgSelected.get().getId_img());
                    String uploadDir = ""+imgSelected.get().getRestaurant().getId_restaurante();
                    FileUploadUtil.deleteImg(uploadDir, imgSelected.get().getUrl());
                }
            }
            return redirectView;
        }

        return new RedirectView("/home");
    }

    /* ------------------------------------------ */


    public Img saveImg(Img img) {
        if (img != null) {
            return imgService.saveImg(img);
        }
        return null;
    }

    public boolean checkUrlisEmpty(String url) {
        return imgService.findImgByUrl(url).isEmpty();
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
                    String uploadDir = ""+img.getRestaurant().getId_restaurante();
                    FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
                }
            }
        } catch (Exception e) {
            //
        }
    }
}
