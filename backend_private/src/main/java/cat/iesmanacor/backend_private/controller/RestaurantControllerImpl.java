package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.controllersImplements.RestaurantControllers;
import cat.iesmanacor.backend_private.entities.*;
import cat.iesmanacor.backend_private.files.FileUploadUtil;
import cat.iesmanacor.backend_private.services.*;
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
public class RestaurantControllerImpl implements RestaurantControllers {
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
    private final String __path_file = "src/main/resources/static/img/restaurants/";
    private final String __route_table = "tables/layout-table";
    private final String __route_home = "home";

    // LISTAS DE RESTURANTES POR X USUARIO

    @GetMapping("/lista/restaurantes")
    public String listRestaurants(ModelMap model){
        List<Useracount> useracount = useracountService.findAllUseracount();
        model.addAttribute("restaurantesUser",restaurantService.findRestaurantByUseracount(useracount.get(1).getId_user()));
        model.addAttribute("images",imgService.findImgFromRestaurantByUseracount(useracount.get(1).getId_user()));
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
        if (id!=null) {
            Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
            if (restaurant.isPresent()) {
                model.addAttribute("restaurant", restaurant.get());
                model.addAttribute("etiqueta", new Etiquetas());
                model.addAttribute("etiquetas",etiquetasService.findAllEtiquetas());
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
                saveImageRestaurant(multipartFile, restaurant);

                return create(model.addAttribute("success", "Restaurante creado correctamente"));
            }
            return create(model.addAttribute("error", "Localizacion no selecionado"));
        }
        return "redirect:/"+__route_home;
    }

    @RequestMapping(value = "/restaurant/put")
    public String put(@ModelAttribute @Valid Restaurant restaurant, BindingResult errors, ModelMap model) {
        inicializeModelMap(model);

        if (errors.hasErrors()) {
            return "redirect:/restaurants";
        }

        if (restaurant.getId_restaurante()!=null) {
            Optional<Restaurant> restaurantBefore = restaurantService.findRestaurantById(restaurant.getId_restaurante());
            if (restaurantBefore.isPresent()) {
                model = checkToUpdate(restaurant, restaurantBefore.get(), model);
            } else {
                return "redirect:/restaurants";
            }
        }
        return show(model);
    }

    @RequestMapping(value = "/restaurants", method = RequestMethod.GET, produces = "application/json")
    @Override
    public String show(ModelMap model) {
        model.addAttribute("restaurants",restaurantService.findAllRestaurants());
        return __route_table;
    }

    @RequestMapping(value = "/restaurant/{id}", method = RequestMethod.GET, produces = "application/json")
    @Override
    public String getRestaurantById(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
            if (restaurant.isPresent()) {
                model.addAttribute("restaurant", restaurant.get());
                return __route_table;
            }
        }
        model.addAttribute("error","RESTAURANT NOT FOUNDED");
        return __route_home;
    }

    /* ------------------------------------------ */

    @Override
    public void saveRestaurant(Restaurant restaurant) {
        restaurantService.saveRestaurant(restaurant);
    }

    @RequestMapping(value = "/restaurant/delete/{id}", method = RequestMethod.GET, produces = "application/json")
    @Override
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

    @Override
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
        if (isMembresiaRestaurantTaken(restaurant,restaurantBefore)) {
            model.addAttribute("error","membresia relation is taken");
            return model;
        }
        updateRestaurant(restaurant);
        return model;
    }

    public void saveImageRestaurant(MultipartFile multipartFile, Restaurant restaurant) {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        Img img = new Img();
        img.setRestaurant(restaurant);
        try {
            FileUploadUtil.saveFile(__path_file, fileName, multipartFile);
            img.setUrl(fileName);
            imgService.saveImg(img);
        } catch (Exception e) {
            //
        }
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
            if (checkNameEtiquetasIsEmpty(etiqueta)) {
                etiquetasService.saveEtiqueta(etiqueta);

                Restaurante_Etiquetas restaurante_etiquetas = new Restaurante_Etiquetas();
                Restaurante_EtiquetasId restaurante_etiquetasId = new Restaurante_EtiquetasId(restaurant, etiqueta);
                restaurante_etiquetas.setId(restaurante_etiquetasId);
                restaurante_etiquetasService.saveRestaurante_Etiquetas(restaurante_etiquetas);
            }
        }
    }

    public List<Etiquetas> stringToArrayOfEtiquetas(List<String> myArray) {
        List<Etiquetas> etiquetas = new ArrayList<>();
        for (String s : myArray) {
            etiquetas.add(new Etiquetas(null, s));
        }
        return etiquetas;
    }
}
