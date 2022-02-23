package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Img;
import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.entities.Traductions;
import cat.iesmanacor.backend_private.entities.Useracount;
import cat.iesmanacor.backend_private.files.FileUploadUtil;
import cat.iesmanacor.backend_private.services.ImgService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import cat.iesmanacor.backend_private.services.UseracountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.io.IOException;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static cat.iesmanacor.backend_private.componentes.User.getUser;
import static cat.iesmanacor.backend_private.componentes.User.isUserCorrect;

@Controller
public class ImgController {

    @Autowired
    ImgService imgService;

    @Autowired
    RestaurantService restaurantService;

    @Autowired
    UseracountService useracountService;

    private static int num_images = 4;
    //////////////         ROUTES        ////////////////////


    @RequestMapping(value = "/imagen/save",method = RequestMethod.POST)
        public RedirectView save(@ModelAttribute @Valid Img img, BindingResult errors, RedirectAttributes model, @RequestParam("image") MultipartFile multipartFile, HttpServletRequest request) {
        if (errors.hasErrors()) {
            return new RedirectView("/error/401");
        }

        Useracount useracount = getUser(request);

        if (isUserCorrect(useracount, useracountService)) {
            if (img.getId_img()!=null) {
                Optional<Img> requestImg = imgService.findImgById(img.getId_img());
                if (requestImg.isPresent()) {
                    return new RedirectView("/error/401");
                }
            }
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));

            if (fileName.matches("^[\\S]+$")) {
                Img imgSumbited = saveImg(img);

                fileName = imgSumbited.getId_img() + fileName;
                img.setUrl(fileName);
                String uploadDir = ""+img.getRestaurant().getId_restaurante();
                FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
            } else {
                Traductions traductions = new Traductions("El nombre de la imagen no debe de contener espacios","The image name must not contain spaces","El nom de la imatge no ha de contenir espais");
                model.addFlashAttribute("error", traductions.getTraductionLocale(request));
            }
            return new RedirectView("/restaurant/update/" + img.getRestaurant().getId_restaurante(), true);
        }
        return new RedirectView("/error/401");
    }

    @RequestMapping(value = "/imagen/saveMultiple",method = RequestMethod.POST)
    public RedirectView saveMultiple(@RequestParam("saveMultiple") List<MultipartFile> multipartFile, RedirectAttributes model, @RequestParam("idRestaurant") BigInteger id, HttpServletRequest request) {
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);

        if (restaurant.isPresent()) {
            if (imgService.findImgFromRestaurantId(restaurant.get().getId_restaurante()).size()+ multipartFile.size() <= num_images) {
                if (!multipartFile.isEmpty()) {
                    for (MultipartFile url : multipartFile) {
                        if (checkUrlisEmpty(url.getOriginalFilename(),imgService)) {
                            if (id != null) {
                                if (StringUtils.cleanPath(Objects.requireNonNull(url.getOriginalFilename())).matches("^[\\S]+$")) {
                                    boolean hasPassed = saveImageRestaurant(url,restaurant.get(),imgService);
                                    if (!hasPassed) {
                                        model.addFlashAttribute("error","Error on save image, contact with our admins (MAX-SIZE 10MB)");
                                    }
                                } else {
                                    Traductions traductions = new Traductions("El nombre de la imagen no debe de contener espacios","The image name must not contain spaces","El nom de la imatge no ha de contenir espais");
                                    model.addFlashAttribute("error", traductions.getTraductionLocale(request));
                                }
                            }
                        }
                    }
                }
            } else {
                RedirectView redirectView = new RedirectView("/restaurant/update/" + id, true);
                Traductions traductions = new Traductions("No puedes añadir mas imagenes, el limite son "+num_images,"You can not add more images, the limit is "+num_images,"No pots afegir més imatges, el límit són "+num_images);
                model.addFlashAttribute("error", traductions.getTraductionLocale(request));
                return redirectView;
            }
            return new RedirectView("/restaurant/update/"+id,true);
        }
        return new RedirectView("/");
    }

    @RequestMapping(value = "/imagen/delete/{id}", method = RequestMethod.GET)
    @Transactional
    public RedirectView delete(@PathVariable(value="id") BigInteger id) {
        RedirectView redirectView = new RedirectView("/restaurant/update/"+id,true);

        if (id!=null) {
            Optional<Img> img = imgService.findImgById(id);
            if (img.isPresent()) {
                Optional<Restaurant> restaurant  = restaurantService.findRestaurantById(img.get().getRestaurant().getId_restaurante());
                if (restaurant.isPresent()) {
                    imgService.deleteImg(img.get().getId_img());
                    List<Img> Listimg = imgService.findImgFromRestaurantId(img.get().getRestaurant().getId_restaurante());
                    String uploadDir = ""+img.get().getRestaurant().getId_restaurante();
                    FileUploadUtil.deleteImg(uploadDir, img.get().getUrl());
                    if (Listimg.isEmpty()) {
                        restaurant.get().setVisible(false);
                        restaurantService.updateRestaurant(restaurant.get());
                    }
                }
            }
        }

        return redirectView;
    }


    @RequestMapping(value = "/imagen/delete", method = RequestMethod.POST)
    @Transactional
    public RedirectView deleteMultiple(@RequestParam("idRestaurante") BigInteger idRestaurante, @RequestParam(value="images") List<BigInteger> ids) {
        RedirectView redirectView = new RedirectView("/restaurant/update/"+idRestaurante,true);

        if (ids!=null) {
            for (BigInteger singleId : ids) {
                Optional<Img> imgSelected = imgService.findImgById(singleId);
                if (imgSelected.isPresent()) {
                    Optional<Restaurant> restaurant  = restaurantService.findRestaurantById(imgSelected.get().getRestaurant().getId_restaurante());
                    if (restaurant.isPresent()) {
                        imgService.deleteImg(imgSelected.get().getId_img());
                        String uploadDir = ""+imgSelected.get().getRestaurant().getId_restaurante();
                        FileUploadUtil.deleteImg(uploadDir, imgSelected.get().getUrl());
                        List<Img> Listimg = imgService.findImgFromRestaurantId(imgSelected.get().getRestaurant().getId_restaurante());
                        if (Listimg.isEmpty()) {
                            restaurant.get().setVisible(false);
                            restaurantService.updateRestaurant(restaurant.get());
                        }
                    }
                }
            }
            return redirectView;
        }

        return new RedirectView("/");
    }

    /* ------------------------------------------ */


    public Img saveImg(Img img) {
        if (img != null) {
            return imgService.saveImg(img);
        }
        return null;
    }

    public static boolean checkUrlisEmpty(String url,ImgService imgService) {
        return imgService.findImgByUrl(url).isEmpty();
    }

    public static boolean saveImageRestaurant(MultipartFile multipartFile, Restaurant restaurant, ImgService imgService) {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        String realFilename = FileUploadUtil.reFormateFormatImage(fileName);

        try {
            // 10MB MAX IMAGE
            if (multipartFile.getSize()<(10485760)) {
                Img img = new Img();
                img.setRestaurant(restaurant);
                img.setUrl(realFilename);
                Img imgSumbited = imgService.saveImg(img);
                if (!checkUrlisEmpty(realFilename, imgService)) {
                    imgSumbited.setRestaurant(restaurant);
                    fileName = imgSumbited.getId_img() + fileName;
                    realFilename = imgSumbited.getId_img() + realFilename;
                    if (checkUrlisEmpty(realFilename, imgService)) {
                        imgSumbited.setUrl(realFilename);
                        imgService.updateImg(imgSumbited);
                        String uploadDir = "" + restaurant.getId_restaurante();
                        boolean hasPassed = FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
                        if (!hasPassed) {
                            imgService.deleteImg(imgSumbited.getId_img());
                        }
                        return true;
                    }
                }
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }
}
