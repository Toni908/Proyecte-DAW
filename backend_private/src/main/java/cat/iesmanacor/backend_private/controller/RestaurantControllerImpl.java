package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.*;
import cat.iesmanacor.backend_private.files.FileUploadUtil;
import cat.iesmanacor.backend_private.services.*;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Controller
public class RestaurantControllerImpl {
    @Autowired
    RestaurantService restaurantService;

    @Autowired
    UseracountService useracountService;

    @Autowired
    MembresiaService membresiaService;

    @Autowired
    LocalidadService localidadService;

    @Autowired
    EtiquetasService etiquetasService;

    @Autowired
    MunicipioService municipioService;

    @Autowired
    Restaurante_EtiquetasService restaurante_etiquetasService;

    @Autowired
    ImgService imgService;

    private final String __route_formulari_create = "formularios/restaurante-create";
    private final String __route_formulari_update = "formularios/restaurante-update";
    private final String __route_home = "home";

    // LISTAS DE RESTURANTES POR X USUARIO

    @GetMapping("/lista/restaurantes")
    public String listRestaurants(ModelMap model){
        List<Useracount> useracount = useracountService.findAllUseracount();
        model.addAttribute("restaurantesUser",restaurantService.findRestaurantByUseracount(useracount.get(1).getId_user()));
        model.addAttribute("images",imgService.findImgFromRestaurantByUseracount(useracount.get(1).getId_user()));
        model.addAttribute("imageSingleForRestaurant",imgService.findSingleImgFromEachRestaurantFindedByUserId(useracount.get(1).getId_user()));
        return "listRestaurants";
    }

    //////////////         RESTAURANTES   FORMULARIOS      ////////////////////

    @RequestMapping(value = "/restaurant/create", method = RequestMethod.GET)
    public String create(ModelMap model) {
        model.addAttribute("restaurant",new Restaurant());
        model.addAttribute("etiqueta", new Etiquetas());
        model.addAttribute("etiquetas",etiquetasService.findAllEtiquetas());
        return __route_formulari_create;
    }

    @RequestMapping(value = "/restaurant/update/{id}", method = RequestMethod.GET)
    public String update(@PathVariable BigInteger id, ModelMap model) {
        //Comprovacion que el usuario en session sea el que tiene el restaurante que pide
        List<Useracount> useracount = useracountService.findAllUseracount();
        if (id!=null) {
            Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
            if (restaurant.isPresent()) {
                model.addAttribute("imageModified",getProvisionalNameImgFromUrlByUseracount(useracount.get(1)));
                model.addAttribute("imagesRestaurant",imgService.findImgFromRestaurantId(restaurant.get().getId_restaurante()));
                model.addAttribute("restaurant", restaurant.get());
                model.addAttribute("etiqueta", new Etiquetas());
                model.addAttribute("etiquetas",getEtiquetasFromRestaurant_Etiqueta(restaurant.get().getId_restaurante()));
                model.addAttribute("array",localidadService.findAllLocalidad());
                return __route_formulari_update;
            }
        }
        return __route_home;
    }


    //////////////         RESTAURANTES   ACTIONS      ////////////////////

    @RequestMapping(value = "/restaurant/save")
    @Transactional()
    public String save(@ModelAttribute @Valid Restaurant restaurant,
                       BindingResult errors,
                       ModelMap model,
                       @RequestParam("image") MultipartFile multipartFile,
                       @RequestParam("etiquetas") List<String> etiquetas) {
        inicializeModelMap(model);

        //Errores redirect
        if (errors.hasErrors()) {
            return "redirect:/restaurant/create";
        }

        if (restaurant.getNombre()!=null) {
            if (!checkNameisEmpty(restaurant.getNombre())) {
                model.addAttribute("error", "Restaurant name already taken");
                return create(model);
            }
        }

        //Cogo usuario random pero tengo que poner que sea de la session
        Optional<Useracount> useracount = useracountService.findUseracountById(useracountService.findAllUseracount().get(1).getId_user());


        if (restaurant.getLocalidad()!=null) {
            if (useracount.isPresent()) {
                restaurant.setUseracount(useracount.get());

                saveRestaurant(restaurant);
                List<Restaurant> restaurantCreated = restaurantService.findRestaurantByNombre(restaurant.getNombre());
                if (!restaurantCreated.isEmpty() && !etiquetas.isEmpty()) {
                    saveEtiquetas(etiquetas, restaurantCreated.get(0));
                }
                saveImageRestaurantFirst(multipartFile, restaurant);

                return "redirect:/restaurant/update/"+restaurant.getId_restaurante();
            }
            return create(model.addAttribute("error", "Localizacion no selecionado"));
        }
        return "redirect:/restaurant/create";
    }

    @RequestMapping(value = "/restaurant/put")
    public String put(@ModelAttribute @Valid Restaurant restaurant, @RequestParam("myLocalidad") String localidadName, @RequestParam("myLocalidadChanged") String myLocalidadChanged, BindingResult errors, ModelMap model) {
        inicializeModelMap(model);

        if (errors.hasErrors()) {
            return "redirect:/"+__route_home;
        }

        Localidad localidad = new Localidad();

        if (myLocalidadChanged.equals("<-Seleciona antes un Municipio")) {
            localidad.setNombre_localidad(localidadName);
        } else {
            localidad.setNombre_localidad(myLocalidadChanged);
        }

        if (restaurant.getId_restaurante()!=null) {
            if (localidad.getNombre_localidad()!=null) {
                List<Localidad> localidadFindInfo = localidadService.findLocalidadByNombre_localidad(localidad.getNombre_localidad());
                if (!localidadFindInfo.isEmpty()) {
                    restaurant.setLocalidad(localidadFindInfo.get(0));
                }
                Optional<Restaurant> restaurantBefore = restaurantService.findRestaurantById(restaurant.getId_restaurante());
                if (restaurantBefore.isPresent()) {
                    // Valores que no deberian cambiarse con esta operacion
                    restaurant.setMembresia(restaurantBefore.get().getMembresia());
                    restaurant.setUseracount(restaurantBefore.get().getUseracount());
                    restaurant.setCartas(restaurantBefore.get().getCartas());
                    restaurant.setVisible(restaurantBefore.get().isVisible());
                    restaurant.setValidated(restaurantBefore.get().isValidated());
                    model = checkToUpdate(restaurant, restaurantBefore.get(), model);
                    model.addAttribute("success","Cambios realizados correctamente");
                } else {
                    return "redirect:/restaurant/update/"+restaurant.getId_restaurante();
                }
                return update(restaurant.getId_restaurante(),model);
            }
        }
        return "redirect:/restaurant/update/"+restaurant.getId_restaurante();
    }

    @RequestMapping(value = "/restaurant/visibility", method = RequestMethod.POST, produces = "application/json")
    public String visibility(@RequestParam("idRestaurante") BigInteger id,@RequestParam(name = "visibilty",defaultValue = "false") boolean visibilidad) {
        if (id!=null) {
            Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);

            if (restaurant.isPresent()) {
                restaurant.get().setVisible(visibilidad);
                updateRestaurant(restaurant.get());
            }
        }
        return "redirect:/restaurant/update/"+id;
    }

    @RequestMapping(value = "/restaurant/validation", method = RequestMethod.POST, produces = "application/json")
    public String validation(@RequestParam("idRestaurant") BigInteger id,@RequestParam(name = "validationResponse",defaultValue = "false") boolean validation) {
        // ONLY ADMINS
        if (id!=null) {
            Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);

            if (restaurant.isPresent()) {
                restaurant.get().setValidated(validation);
                updateRestaurant(restaurant.get());
            }
        }
        return "redirect:/restaurante/configuration/admin";
    }

    /* ------------------------------------------ */

    public void saveRestaurant(Restaurant restaurant) {
        restaurantService.saveRestaurant(restaurant);
    }

    @RequestMapping(value = "/restaurant/delete/{id}", method = RequestMethod.GET, produces = "application/json")
    public RedirectView delete(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
            if (restaurant.isPresent()) {
                restaurantService.deleteRestaurant(id);
            } else {
                model.addAttribute("error", "LOCALIDAD NOT FOUNDED");
            }
        }
        return new RedirectView("/restaurants");
    }

    public void updateRestaurant(Restaurant restaurantNew) {
        restaurantService.updateRestaurant(restaurantNew);
    }

    public void inicializeModelMap(ModelMap model) {
        model.remove("restaurant");
        model.remove("restaurants");
        model.remove("error");
    }

    public boolean checkNameisEmpty(String name) {
        return restaurantService.findRestaurantByNombre(name).isEmpty();
    }

    public boolean checkMembresiaisEmpty(BigInteger id) {
        return restaurantService.findRestaurantById_Membresia(id).isEmpty();
    }

    public boolean isNameRestaurantTaken(Restaurant restaurant, Restaurant restaurantBefore) {
        if (restaurant.getNombre()!=null) {
            if (restaurant.getNombre().equals(restaurantBefore.getNombre())) {
                return false;
            } else return !checkNameisEmpty(restaurant.getNombre());
        }
        return true;
    }

    public boolean isMembresiaRestaurantTaken(Restaurant restaurant, Restaurant restaurantBefore) {
        if (restaurant.getMembresia().getId_membresia()!=null) {
            if (restaurant.getMembresia().getId_membresia().equals(restaurantBefore.getMembresia().getId_membresia())) {
                return false;
            } else return !checkMembresiaisEmpty(restaurant.getMembresia().getId_membresia());
        }
        return true;
    }

    public ModelMap checkToUpdate(Restaurant restaurant, Restaurant restaurantBefore, ModelMap model) {
        if (isNameRestaurantTaken(restaurant,restaurantBefore)) {
            model.addAttribute("error","name restaurant is taken");
            return model;
        }
        updateRestaurant(restaurant);
        return model;
    }


    // ETIQUETA RESTAURANT RELATION

    public boolean checkNameEtiquetasIsEmpty(Etiquetas etiquetas) {
        if (etiquetas.getNombre()!=null) {
            return etiquetasService.findEtiquetaByName(etiquetas.getNombre()).isEmpty();
        }
        return false;
    }

    public void saveEtiquetas(List<String> myArray, Restaurant restaurant) {
        List<Etiquetas> etiquetas = stringToArrayOfEtiquetas(myArray);
        for (Etiquetas etiqueta : etiquetas) {
            Restaurante_Etiquetas restaurante_etiquetas = new Restaurante_Etiquetas();
            Restaurante_EtiquetasId restaurante_etiquetasId = new Restaurante_EtiquetasId();

            if (checkNameEtiquetasIsEmpty(etiqueta)) {
                etiquetasService.saveEtiqueta(etiqueta);
                restaurante_etiquetasId = new Restaurante_EtiquetasId(restaurant, etiqueta);
            } else {
                List<Etiquetas> etiquetaFound = etiquetasService.findEtiquetaByName(etiqueta.getNombre());
                if (etiquetaFound!=null) {
                    restaurante_etiquetasId = new Restaurante_EtiquetasId(restaurant, etiquetaFound.get(0));
                }
            }
            restaurante_etiquetas.setId(restaurante_etiquetasId);
            restaurante_etiquetasService.saveRestaurante_Etiquetas(restaurante_etiquetas);
        }
    }

    public List<Etiquetas> stringToArrayOfEtiquetas(List<String> myArray) {
        List<Etiquetas> etiquetas = new ArrayList<>();
        for (String s : myArray) {
            etiquetas.add(new Etiquetas(null, s));
        }
        return etiquetas;
    }

    public List<Etiquetas> getEtiquetasFromRestaurant_Etiqueta(BigInteger id) {
        List<Restaurante_Etiquetas> restaurante_etiquetas = restaurante_etiquetasService.getRestaurant_EtiquetasFromIdRestaurant(id);
        List<Etiquetas> etiquetas = new ArrayList<>();
        for (Restaurante_Etiquetas restaurante_etiqueta : restaurante_etiquetas) {
            Optional<Etiquetas> etiqueta = etiquetasService.findEtiquetaById(restaurante_etiqueta.getId().getEtiquetas().getId_etiqueta());
            etiqueta.ifPresent(etiquetas::add);
        }
        return etiquetas;
    }

    // IMG

    public void saveImageRestaurantFirst(MultipartFile multipartFile, Restaurant restaurant) {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        Img img = new Img();
        img.setRestaurant(restaurant);
        img.setUrl(fileName);
        try {
            Img imgSumbited = imgService.saveImg(img);
            fileName = imgSumbited.getId_img()+fileName;
            imgSumbited.setUrl(fileName);
            imgService.updateImg(imgSumbited);
            String uploadDir = "restaurantes-photos/"+img.getRestaurant().getId_restaurante();
            FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);

        } catch (Exception e) {
            //
        }
    }

    public List<ArrayList<String>> getProvisionalNameImgFromUrlByUseracount(Useracount useracount) {
        List<Img> imgs = imgService.findImgFromRestaurantByUseracount(useracount.getId_user());
        List<ArrayList<String>> provisional = new ArrayList<>();
        for (Img img : imgs) {
            ArrayList<String> array = new ArrayList<>();
            array.add(0,img.getUrl());
            String urlModified = img.getUrl();
            array.add(1,urlModified.substring(img.getId_img().bitCount()));
            provisional.add(array);
        }
        return provisional;
    }
}
