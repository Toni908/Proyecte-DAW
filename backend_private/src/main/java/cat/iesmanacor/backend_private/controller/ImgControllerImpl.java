package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.controllersImplements.ImgController;
import cat.iesmanacor.backend_private.entities.Img;
import cat.iesmanacor.backend_private.files.FileUploadUtil;
import cat.iesmanacor.backend_private.services.ImgService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.Optional;

@Controller
public class ImgControllerImpl implements ImgController {

    private final String __route_formularis = "formularis/layout-form";
    private final String __route_table = "tables/layout-table";
    private final String __route_home = "links";

    private final String __path_file = "src/main/resources/static/img/";

    @Autowired
    ImgService imgService;

    @Autowired
    RestaurantService restaurantService;

    //////////////         FACTURAS FORMULARIOS        ////////////////////

    @RequestMapping(value = "/img/create", method = RequestMethod.GET)
    public String create(ModelMap model) {
        model.addAttribute("type","img-create");
        model.addAttribute("object",new Img());
        model.addAttribute("array",restaurantService.findAllRestaurants());
        return __route_formularis;
    }

    @RequestMapping(value = "/img/update/{id}", method = RequestMethod.GET)
    public String update(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Img> img = imgService.findImgById(id);
            if (img.isPresent()) {
                model.addAttribute("type", "img-update");
                model.addAttribute("object", img.get());
                model.addAttribute("array",restaurantService.findAllRestaurants());
                return __route_formularis;
            }
        }
        model.addAttribute("error","IMG SELECTED DOESNT PRESENT");
        return __route_home;
    }


    //////////////         ROUTES        ////////////////////


    @RequestMapping(value = "/img/save",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String save(@ModelAttribute @Valid Img img, BindingResult errors, ModelMap model, @RequestParam("image") MultipartFile multipartFile) throws IOException {
        inicializeModelMap(model);
        if (errors.hasErrors()) {
            return "redirect:/img/create";
        }

        if (img.getId_img()!=null) {
            Optional<Img> requestImg = imgService.findImgById(img.getId_img());
            if (requestImg.isPresent()) {
                model.addAttribute("type", "img-create");
                model.addAttribute("object", new Img());
                model.addAttribute("array", restaurantService.findAllRestaurants());
                model.addAttribute("error", "TRYING TO SAVE IMG THAT EXIST");
                return show(model);
            }
        }
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));

        FileUploadUtil.saveFile(__path_file, fileName, multipartFile);
        img.setUrl(fileName);
        saveImg(img);
        return show(model);
    }


    @RequestMapping(value = "/img/put",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String put(@ModelAttribute @Valid Img img, ModelMap model, Errors errors, @RequestParam("image") MultipartFile multipartFile) throws IOException {
        inicializeModelMap(model);
        if (errors.hasErrors()) {
            return "redirect:/imgs";
        }


        if (img.getId_img()!=null) {
            Optional<Img> imgUpdate = imgService.findImgById(img.getId_img());
            if (imgUpdate.isPresent()) {
                Optional<Img> imgBefore = imgService.findImgById(img.getId_img());

                String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));

                if (checkUrlisEmpty(fileName) && imgBefore.isPresent()) {
                    Path source = Paths.get(__path_file+"/"+imgBefore.get().getUrl());
                    Files.move(source, source.resolveSibling(fileName));
                    img.setUrl(fileName);
                    updateImg(img);
                } else {
                    model.addAttribute("error","name of the img is in");
                }
            } else {
                model.addAttribute("error","factura id doesnt exit");
            }
        }
        return show(model);
    }

    @RequestMapping(value = "/img/delete/{id}", method = RequestMethod.GET, produces = "application/json")
    public RedirectView delete(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Img> img = imgService.findImgById(id);
            if (img.isPresent()) {
                deleteImgById(id);
            } else {
                model.addAttribute("error", "FACTURA NOT FOUNDED");
            }
        }
        return new RedirectView("/imgs");
    }


    @RequestMapping(value = "/imgs",method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    @Override
    public String show(ModelMap model) {
        model.addAttribute("imgs",imgService.findAllImgs());
        return __route_table;
    }

    @RequestMapping(value = "/img/{id}",method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    @Override
    public String findImgById(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Img> img = imgService.findImgById(id);
            if (img.isPresent()) {
                model.addAttribute("img", img.get());
                return __route_table;
            }
        }
        model.addAttribute("error","IMG NOT FOUNDED");
        return __route_home;
    }


    /* ------------------------------------------ */


    @Override
    public void saveImg(Img img) {
        if (img != null) {
            imgService.saveImg(img);
        }
    }

    @Override
    public void deleteImgById(BigInteger id) {
        Optional<Img> img = imgService.findImgById(id);
        if (img.isPresent()) {
            imgService.deleteImg(id);
            deleteImgOnDirectory(img.get().getUrl(),__path_file);
        }
    }

    @Override
    public void updateImg(Img imgNew) {
        imgService.updateImg(imgNew);
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
}
