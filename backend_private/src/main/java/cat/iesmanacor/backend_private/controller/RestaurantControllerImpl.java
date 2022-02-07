package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.componentes.User;
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

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static cat.iesmanacor.backend_private.componentes.Etiquetas.saveEtiquetas;
import static cat.iesmanacor.backend_private.componentes.User.getUser;


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
    CartaService cartaService;

    @Autowired
    MunicipioService municipioService;

    @Autowired
    Restaurante_EtiquetasService restaurante_etiquetasService;

    @Autowired
    ImgService imgService;

    @Autowired
    EmailService emailService;

    private final String __route_formulari_create = "formularios/restaurante-create";
    private final String __route_formulari_update = "formularios/restaurante-update";

    // LISTAS DE RESTURANTES POR X USUARIO

    @GetMapping("/lista/restaurantes")
    public String listRestaurants(ModelMap model, HttpServletRequest request){
        Useracount useracount = getUser(request);

        if (useracount!=null) {
            Optional<Useracount> useracountDDBB = useracountService.findUseracountById(useracount.getId_user());
            if (useracountDDBB.isPresent()) {
                if (useracountDDBB.get().equals(useracount)) {
                    model.addAttribute("cartas", getCartasRestaurantActive(useracountDDBB.get()));
                    model.addAttribute("restaurantesUser", restaurantService.findRestaurantByUseracount(useracountDDBB.get().getId_user()));
                    model.addAttribute("ImgImages", imagesIsEmpties(useracountDDBB.get()));
                    model.addAttribute("user", useracountDDBB.get());
                    return "listRestaurants";
                }
            }
        }
        return "redirect:/error/401";
    }

    public List<CartaIsEmpty> getCartasRestaurantActive(Useracount useracount) {
        List<Restaurant> restaurants = restaurantService.findRestaurantByUseracount(useracount.getId_user());
        List<CartaIsEmpty> cartaIsEmpties = new ArrayList<>();
        for (Restaurant restaurant : restaurants) {
            boolean hasVisible = false;
            if (!restaurant.getCartas().isEmpty()) {
                for (Carta carta : restaurant.getCartas()) {
                    if (carta.isVisible()) {
                        cartaIsEmpties.add(new CartaIsEmpty(restaurant,false,true));
                        hasVisible = true;
                        break;
                    }
                }
                if (!hasVisible) {
                    cartaIsEmpties.add(new CartaIsEmpty(restaurant,false,false));
                }
            } else {
                cartaIsEmpties.add(new CartaIsEmpty(restaurant,true,false));
            }
        }
        return cartaIsEmpties;
    }

    public List<ListImagesIsEmpty> imagesIsEmpties(Useracount useracount) {
        List<Restaurant> restaurants = restaurantService.findRestaurantByUseracount(useracount.getId_user());
        List<ListImagesIsEmpty> imagesIsEmpties = new ArrayList<>();
        for (Restaurant restaurant : restaurants) {
            List<Img> imgs = imgService.findImgFromRestaurantId(restaurant.getId_restaurante());
            if (imgs.isEmpty()) {
                imagesIsEmpties.add(new ListImagesIsEmpty(imgs,restaurant.getId_restaurante(), true));
            } else {
                imagesIsEmpties.add(new ListImagesIsEmpty(imgs,restaurant.getId_restaurante(),false));
            }
        }
        return imagesIsEmpties;
    }

    //////////////         RESTAURANTES   FORMULARIOS      ////////////////////

    @RequestMapping(value = "/restaurant/create", method = RequestMethod.GET)
    public String create(ModelMap model, HttpServletRequest request) {
        Useracount useracount = getUser(request);

        if (useracount!=null) {
            Optional<Useracount> useracountDDBB = useracountService.findUseracountById(useracount.getId_user());
            if (useracountDDBB.isPresent()) {
                if (useracountDDBB.get().equals(useracount)) {
                    model.addAttribute("restaurant", new Restaurant());
                    model.addAttribute("etiqueta", new Etiquetas());
                    model.addAttribute("etiquetas", etiquetasService.findAllEtiquetas());
                    return __route_formulari_create;
                }
            }
        }
        return "redirect:/error/401";
    }

    @RequestMapping(value = "/restaurant/update/{id}", method = RequestMethod.GET)
    public String update(@PathVariable BigInteger id, ModelMap model, HttpServletRequest request) {
        Useracount useracount = getUser(request);

        if (useracount!=null) {
            if (useracount.getId_user()!=null) {
                Optional<Useracount> useracountDDBB = useracountService.findUseracountById(useracount.getId_user());
                if (useracountDDBB.isPresent()) {
                    if (useracountDDBB.get().equals(useracount)) {
                        if (id != null) {
                            Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
                            if (restaurant.isPresent()) {
                                if (restaurant.get().getUseracount().equals(useracount)) {
                                    model.addAttribute("imageModified", getProvisionalNameImgFromUrlByUseracount(useracount));
                                    model.addAttribute("imagesRestaurant", imgService.findImgFromRestaurantId(restaurant.get().getId_restaurante()));
                                    model.addAttribute("restaurant", restaurant.get());
                                    model.addAttribute("etiqueta", new Etiquetas());
                                    model.addAttribute("etiquetas", getEtiquetasFromRestaurant_Etiqueta(restaurant.get().getId_restaurante()));
                                    model.addAttribute("array", localidadService.findAllLocalidad());
                                    return __route_formulari_update;
                                } else {
                                    return "redirect:/error/401";
                                }
                            } else {
                                return "redirect:/";
                            }
                        } else {
                            return "redirect:/";
                        }
                    }
                }
            }
        }
        return "redirect:/error/401";
    }


    //////////////         RESTAURANTES   ACTIONS      ////////////////////

    @RequestMapping(value = "/restaurant/save")
    @Transactional()
    public String save(@ModelAttribute @Valid Restaurant restaurant,
                       BindingResult errors,
                       ModelMap model,
                       @RequestParam("image") MultipartFile multipartFile,
                       @RequestParam("etiquetas") List<String> etiquetas,
                       HttpServletRequest request) {
        inicializeModelMap(model);

        //Errores redirect
        if (errors.hasErrors()) {
            return "redirect:/restaurant/create";
        }

        if (restaurant.getNombre()!=null) {
            if (!checkNameisEmpty(restaurant.getNombre())) {
                model.addAttribute("error", "Restaurant name already taken");
                return create(model,request);
            }
        }

        //Cogo usuario random pero tengo que poner que sea de la session
        Optional<Useracount> useracount = useracountService.findUseracountById(useracountService.findAllUseracount().get(1).getId_user());


        if (restaurant.getLocalidad()!=null) {
            if (useracount.isPresent()) {
                restaurant.setUseracount(useracount.get());
                if (restaurant.getLatitud()!=null || restaurant.getLongitud()!=null) {
                    saveRestaurant(restaurant);
                    List<Restaurant> restaurantCreated = restaurantService.findRestaurantByNombre(restaurant.getNombre());
                    if (!restaurantCreated.isEmpty() && !etiquetas.isEmpty()) {
                        saveEtiquetas(etiquetas, restaurantCreated.get(0), etiquetasService, restaurante_etiquetasService);
                    }
                    saveImageRestaurantFirst(multipartFile, restaurant);

                    return "redirect:/restaurant/update/" + restaurant.getId_restaurante();
                }
            }
            return create(model.addAttribute("error", "Localizacion no selecionado"),request);
        }
        return "redirect:/restaurant/create";
    }

    @RequestMapping(value = "/restaurant/put")
    public String put(@ModelAttribute @Valid Restaurant restaurant, @RequestParam("myLocalidad") String localidadName, @RequestParam("myLocalidadChanged") String myLocalidadChanged, BindingResult errors, ModelMap model, HttpServletRequest request) {
        inicializeModelMap(model);

        if (errors.hasErrors()) {
            return "redirect:/home";
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
                return update(restaurant.getId_restaurante(),model, request);
            }
        }
        return "redirect:/restaurant/update/"+restaurant.getId_restaurante();
    }

    @RequestMapping(value = "/restaurant/visibility", method = RequestMethod.POST, produces = "application/json")
    public String visibility(@RequestParam("idRestaurante") BigInteger id,@RequestParam(name = "visibilty",defaultValue = "false") boolean visibilidad, ModelMap model,HttpServletRequest request) {
        if (id!=null) {
            Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);

            if (restaurant.isPresent()) {
                if (visibilidad) {
                    List<Img> imgs = imgService.findImgFromRestaurantId(restaurant.get().getId_restaurante());
                    if (!imgs.isEmpty()) {
                        restaurant.get().setVisible(true);
                        updateRestaurant(restaurant.get());
                        model.addAttribute("success", "El restaurante "+restaurant.get().getNombre()+" es visible");
                        return update(restaurant.get().getId_restaurante(),model,request);
                    } else {
                        model.addAttribute("error","El restaurante no tiene imagen, no se puede hacer visible");
                        return update(restaurant.get().getId_restaurante(),model,request);
                    }
                } else {
                    restaurant.get().setVisible(false);
                    updateRestaurant(restaurant.get());
                    model.addAttribute("success", "El restaurante "+restaurant.get().getNombre()+" es invisible");
                    return update(restaurant.get().getId_restaurante(),model,request);
                }
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
                if (validation) {
//                    emailService.sendSimpleMessage("agarcia15183@alumnes.iesmanacor.cat", "Validacion " + restaurant.get().getNombre(), "El restaurante " + restaurant.get().getNombre() + " acaba de ser validado por un administrador, ahora mismo ya puede ser visible para todos los usuarios, para realizar algun cambio por si aun no lo has hecho http//localhost:8080/restaurant/update/" + restaurant.get().getId_restaurante() + " , para mas info visite a la pestaña de preguntas.");
                }
            }
        }
        return "redirect:/restaurante/configuration/admin";
    }

    /* ------------------------------------------ */

    public void saveRestaurant(Restaurant restaurant) {
        restaurantService.saveRestaurant(restaurant);
    }

    @RequestMapping(value = "/restaurant/delete/{id}", method = RequestMethod.GET)
    public RedirectView delete(@PathVariable BigInteger id) {
        if (id!=null) {
            Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
            if (restaurant.isPresent()) {
                List<Img> imgs = imgService.findImgFromRestaurantId(restaurant.get().getId_restaurante());
                // DELETE IMG BEFORE DELETE ALL
                for (Img singleId : imgs) {
                    Optional<Img> imgSelected = imgService.findImgById(singleId.getId_img());
                    if (imgSelected.isPresent()) {
                        imgService.deleteImg(imgSelected.get().getId_img());
                        String uploadDir = ""+imgSelected.get().getRestaurant().getId_restaurante();
                        FileUploadUtil.deleteImg(uploadDir, imgSelected.get().getUrl());
                    }
                }
                restaurantService.deleteRestaurant(id);
            }
        }
        return new RedirectView("/lista/restaurantes");
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
            String urlModified = deleteCharsFromString(img.getUrl(), img.getId_img());
            array.add(1,urlModified);
            provisional.add(array);
        }
        return provisional;
    }

    public String deleteCharsFromString(String toUpdate, BigInteger number) {
        int numberInt = number.toString().length();
        return toUpdate.substring(numberInt);
    }
}
