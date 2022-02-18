package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.componentes.User;
import cat.iesmanacor.backend_private.entities.*;
import cat.iesmanacor.backend_private.entityDTO.UseracountDTO;
import cat.iesmanacor.backend_private.files.FileUploadUtil;
import cat.iesmanacor.backend_private.services.*;
import org.mindrot.jbcrypt.BCrypt;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import javax.validation.Valid;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import static cat.iesmanacor.backend_private.componentes.User.getUser;
import static cat.iesmanacor.backend_private.componentes.User.isUserCorrect;

@Controller
public class UseracountController {

    @Autowired
    UseracountService useracountService;

    @Autowired
    EmailService emailService;

    @Autowired
    CodeService codeService;

    @Autowired
    ImgService imgService;

    @Autowired
    RestaurantService restaurantService;

    public String typeCodePassword = "recoverPassword";
    public String typeCodeUser = "deleteUser";
    public String typeCodeRestaurant = "deleteRestaurant";

    @GetMapping("/user")
    public String user(ModelMap model, HttpServletRequest request){
        Useracount useracount = getUser(request);
        if (isUserCorrect(useracount,useracountService)) {
            Optional<Useracount> useracountDDBB = useracountService.findUseracountById(useracount.getId_user());
            ModelMapper modelMapper = new ModelMapper();
            if (useracountDDBB.isPresent()) {
                UseracountDTO useracountDTO = modelMapper.map(useracountDDBB.get(), UseracountDTO.class);
                model.addAttribute("hascode", codeService.findById(new CodesId(useracountDDBB.get(), typeCodePassword)).isEmpty());
                model.addAttribute("user", useracountDTO);
                if (codeService.findById(new CodesId(useracount,typeCodeRestaurant)).isPresent()) {
                    model.addAttribute("codeEliminar",true);
                }
                return "formularios/user_update";
            }
        }
        return "redirect:/error/401";
    }

    @RequestMapping(value = "/user/verified",method = RequestMethod.POST)
    public String verified(@RequestParam("verified") String verified, ModelMap model, HttpServletRequest request){
        Useracount userVerify = getUser(request);

        if (isUserCorrect(userVerify,useracountService)) {
            Optional<Useracount> useracount = useracountService.findUseracountById(userVerify.getId_user());
            if (useracount.isPresent()) {
                if (BCrypt.checkpw(verified, useracount.get().getPassword())) {
                    model.addAttribute("verified",true);
                    Traductions traductions = new Traductions("Ya puedes ver la informacion importante","You can now see the important information","Ja pots veure la informació important");
                    model.addAttribute("success", traductions.getTraductionLocale(request));
                } else {
                    Traductions traductions = new Traductions("Contraseña incorrecta","Incorrect Password","Contrasenya incorrecte");
                    model.addAttribute("error", traductions.getTraductionLocale(request));
                }
                model.addAttribute("hascode", codeService.findById(new CodesId(useracount.get(), typeCodePassword)).isEmpty());
                model.addAttribute("user", useracount.get());
                if (codeService.findById(new CodesId(useracount.get(),typeCodeRestaurant)).isPresent()) {
                    model.addAttribute("codeEliminar",true);
                }
                return "formularios/user_update";
            }
        }
        return "redirect:/error/401";
    }

    @RequestMapping(value = "/user/put",method = RequestMethod.POST)
    public String put(@ModelAttribute @Valid UseracountDTO useracountDTO, BindingResult errors, HttpServletRequest request, HttpSession session){
        Useracount userVerify = getUser(request);

        //Errores redirect
        if (errors.hasErrors()) {
            return "redirect:/error/401";
        }

        if (isUserCorrect(userVerify,useracountService)) {
            // ID Y CONTRASEÑA TIENEN QUE SER IGUALES
            Optional<Useracount> useracountDDBB = useracountService.findUseracountById(userVerify.getId_user());
            if (useracountDDBB.isPresent()) {
                ModelMapper modelMapper = new ModelMapper();
                Useracount useracount = modelMapper.map(useracountDTO, Useracount.class);
                useracount.setAdmin(useracountDDBB.get().isAdmin());
                useracount.setPassword(useracountDDBB.get().getPassword());
                useracount.setCorreo(useracountDDBB.get().getCorreo());
                useracount.setDni(useracountDDBB.get().getDni());
                useracountService.updateUseracount(useracount);
                session.invalidate();
                return "redirect:/login";
            }
        }
        return "redirect:/error/401";
    }

    // PUEDE ENTRAR EN EL USUARIO
    @RequestMapping(value = "/user/recuperar",method = RequestMethod.POST)
    public String recuperar(@RequestParam("codigo_email") String code,@RequestParam("password_change_recuperar") String password_change_recuperar, @RequestParam("password_change_confirm_recuperar") String password_change_confirm_recuperar, ModelMap model, HttpServletRequest request,HttpSession session) {
        Useracount userVerify = getUser(request);
        CodesId result;

        if (isUserCorrect(userVerify,useracountService)) {
            Optional<Useracount> useracount = useracountService.findUseracountById(userVerify.getId_user());
            if (useracount.isPresent()) {
                List<Codes> codes = codeService.findFromCodesAndUseracount(useracount.get().getId_user(),code);
                for (Codes value : codes) {
                    if (value.getId().getTypes().equals(typeCodePassword)) {
                        result = value.getId();
                        if (password_change_recuperar.equals(password_change_confirm_recuperar)) {
                            Optional<Useracount> useracountDDBB = useracountService.findUseracountById(userVerify.getId_user());
                            if (useracountDDBB.isPresent()) {
                                final String encrypted = BCrypt.hashpw(password_change_recuperar, BCrypt.gensalt());
                                useracountDDBB.get().setPassword(encrypted);
                                useracountService.updateUseracount(useracountDDBB.get());
                                codeService.delete(result);
                                session.invalidate();
                                return "redirect:/login";
                            } else {
                                Traductions traductions = new Traductions("No se han encontrado coincidencias","No matches found","No s'han trobat coincidències");
                                model.addAttribute("error", traductions.getTraductionLocale(request));
                                model.addAttribute("user", userVerify);
                                if (codeService.findById(new CodesId(useracount.get(),typeCodeRestaurant)).isPresent()) {
                                    model.addAttribute("codeEliminar",true);
                                }
                                return "formularios/user_update";
                            }
                        }
                        break;
                    }
                }

            }
        }
        return "redirect:/error/401";
    }

    // NO PUEDE ENTRAR EN EL USUARIO
    @RequestMapping(value = "/recuperar/password",method = RequestMethod.POST)
    public String recuperarPassword(@RequestParam("code") String code, @RequestParam("dni") String dni, @RequestParam("nombre_usuario") String nombre_usuario, @RequestParam("password") String password, @RequestParam("password_confirm") String password_confirm, ModelMap model,HttpSession session) {
        List<Codes> codes = codeService.findFromTypesAndCodes(code, typeCodePassword);

        if (!password.equals(password_confirm)) {
            Traductions traductions = new Traductions("Credenciales no coinciden", "Credentials do not match", "Credencials no coincideixen");
            model.addAttribute("error", traductions.getTraduction());
            return "recuperar";
        }

        boolean hasPassed = false;
        for (Codes value : codes) {
            Optional<Useracount> useracount = useracountService.findUseracountById(value.getId().getUseracount().getId_user());
            if (useracount.isPresent()) {
                if (useracount.get().getDni().equals(dni)) {
                    if (useracount.get().getNombre_usuario().equals(nombre_usuario)) {
                        final String encrypted = BCrypt.hashpw(password, BCrypt.gensalt());
                        useracount.get().setPassword(encrypted);
                        useracountService.updateUseracount(useracount.get());
                        codeService.delete(new CodesId(useracount.get(), typeCodePassword));
                        session.invalidate();
                        return "redirect:/login";
                    } else {
                        hasPassed = true;
                    }
                }
            }
        }
        if (hasPassed) {
            Traductions traductions = new Traductions("La contraseñas no coinciden", "The passwords do not match", "Les contrasenyes no coincideixen");
            model.addAttribute("error", traductions.getTraduction());
            return "recuperar";
        }
        return "redirect:/error/401";
    }



    @RequestMapping(value = "/send/code",method = RequestMethod.POST)
    public String codeSend(@RequestParam("email_actual") String email_actual, ModelMap model) {
        List<Useracount> useracount = useracountService.findUseracountsByEmail(email_actual);
        if (!useracount.isEmpty()) {
            if (useracount.size()==1) {
                if (codeService.findById(new CodesId(useracount.get(0), typeCodePassword)).isEmpty()) {
                    String generateCode = generateCode(useracount.get(0),typeCodePassword);
                    emailService.sendMessageWithAttachment(useracount.get(0).getCorreo(), "Recuperar contraseña",  email_actual, generateCode,"Se ha querido restaurar<br> la contraseña del usuario");
                    model.addAttribute("hasSend",true);
                    Traductions traductions = new Traductions("Se envió un correo con el código","An email with the code was sent","Es va enviar un correu amb el codi");
                    model.addAttribute("success", traductions.getTraduction());
                } else {
                    model.addAttribute("hasSend",false);
                    Traductions traductions = new Traductions("Ya se envío un correo con el código","An email with the code has already been sent.","Ja s'envio un correu amb el codi");
                    model.addAttribute("error", traductions.getTraduction());
                }
                return "recuperar";
            }
        } else {
            Traductions traductions = new Traductions("El correo no se encuentra en ningún registro","The mail is not found in any record","El correu no es troba a cap registre");
            model.addAttribute("error", traductions.getTraduction());
            return "recuperar";
        }
        return "redirect:/error/401";
    }

    @Transactional
    @RequestMapping(value = "/regererar/code",method = RequestMethod.POST)
    public String regenerarCode(@RequestParam("email") String email, ModelMap model) {
        List<Useracount> useracount = useracountService.findUseracountsByEmail(email);
        if (!useracount.isEmpty()) {
            codeService.delete(new CodesId(useracount.get(0), typeCodePassword));
            codeSend(email,model);
        } else {
            Traductions traductions = new Traductions("No se encontró ningún código relacionado con el correo","No mail-related code found","No s'ha trobat cap codi relacionat amb el correu");
            model.addAttribute("error", traductions.getTraduction());
        }
        return "recuperar";
    }

    @Transactional
    @GetMapping(value = "/delete/code/password")
    public String deleteCode(HttpServletRequest request, HttpSession session) {
        Useracount userVerify = getUser(request);
        if (isUserCorrect(userVerify,useracountService)) {
            Optional<Useracount> useracount = useracountService.findUseracountById(userVerify.getId_user());
            if (useracount.isPresent()) {
                Optional<Codes> codes = codeService.findById(new CodesId(useracount.get(), typeCodePassword));
                if (codes.isPresent()) {
                    codeService.delete(codes.get().getId());
                    session.invalidate();
                    return "/login";
                }
            }
        }
        return "redirect:/error/401";
    }


    @GetMapping("/recuperar")
    public String recuperarPassword() {
        return "recuperar";
    }

    @GetMapping("/recuperar/send")
    public String recuperarPasswordHasSend(ModelMap model) {
        model.addAttribute("hasSend",true);
        return "recuperar";
    }

    // ENVIO DE CORREO PARA RECUPERAR - MODIFICAR CONTRASEÑA
    @RequestMapping("/user/password")
    public String password(ModelMap model, HttpServletRequest request){
        Useracount userVerify = getUser(request);
        if (isUserCorrect(userVerify,useracountService)) {
            Optional<Useracount> useracount = useracountService.findUseracountById(userVerify.getId_user());
            if (useracount.isPresent()) {
                String generateCode = generateCode(useracount.get(),typeCodePassword);
                emailService.sendMessageWithAttachment(useracount.get().getCorreo(), "Recuperar contraseña del usuario" + useracount.get().getNombre_usuario(), useracount.get().getCorreo(),generateCode,"Se ha querido recuperar<br> la contraseña del usuario");
                model.addAttribute("hascode", codeService.findById(new CodesId(useracount.get(), typeCodePassword)).isEmpty());
                Traductions traductions = new Traductions("Se le a enviado un correo a "+useracount.get().getCorreo(),"An email has been sent to "+useracount.get().getCorreo(),"Se li ha enviat un correu a"+useracount.get().getCorreo());
                model.addAttribute("success", traductions.getTraduction());
                model.addAttribute("user", useracount.get());
                if (codeService.findById(new CodesId(useracount.get(),typeCodeRestaurant)).isPresent()) {
                    model.addAttribute("codeEliminar",true);
                }
                return "formularios/user_update";
            }
        }
        return "redirect:/error/401";
    }

    public String generateCode(Useracount useracount, String type) {
        CodesId codesId = new CodesId(useracount, type);
        Random random = new Random();

        if (codeService.findById(codesId).isPresent()) {
            codeService.delete(codesId);
        }

        // 4 como diferencia
        int length = random.nextInt(4);
        // despues le sumo 6 como minimo
        length = length + 6;
        String number = Codes.getRandomString(length);
        Codes codes = new Codes(codesId, number);
        codeService.save(codes);
        return number;
    }


    @RequestMapping(value = "/restaurant/regenerate/code", method = RequestMethod.GET)
    public String regenerateCodeRestaurant(HttpServletRequest request,ModelMap model) {
        Useracount userVerify = getUser(request);

        if (isUserCorrect(userVerify,useracountService)) {
            Optional<Useracount> useracount = useracountService.findUseracountById(userVerify.getId_user());
            if (useracount.isPresent()) {
                if (codeService.findById(new CodesId(useracount.get(),typeCodeRestaurant)).isPresent()) {
                    codeService.delete(new CodesId(useracount.get(),typeCodePassword));
                    String result = generateCode(useracount.get(),typeCodeUser);
                    emailService.sendMessageWithAttachment(useracount.get().getCorreo(), "Eliminar Restaurante", useracount.get().getCorreo(), result, "Se ha querido generar un codigo<br>para eliminar un restaurante");
                    Traductions traductions = new Traductions("Se le a enviado un correo a "+ useracount.get().getCorreo(),"An email has been sent to "+useracount.get().getCorreo(),"Se li ha enviat un correu a"+useracount.get().getCorreo());
                    model.addAttribute("success", traductions.getTraduction());
                }
                model.addAttribute("user", useracount.get());
                if (codeService.findById(new CodesId(useracount.get(),typeCodeRestaurant)).isPresent()) {
                    model.addAttribute("codeEliminar",true);
                }
                return "formularios/user_update";
            }
        }
        return "redirect:/error/401";
    }

    // CAMBIAR CONTRASEÑA SI TE SABES LA ACTUAL
    @RequestMapping(value = "/user/changepassword", method = RequestMethod.POST)
    public String changepassword(@RequestParam("password_actual") String password_actual, @RequestParam("password_change") String password_change, @RequestParam("password_change_confirm") String password_change_confirm, ModelMap model, HttpServletRequest request,HttpSession session){
        Useracount userVerify = getUser(request);

        if (isUserCorrect(userVerify,useracountService)) {
            Optional<Useracount> useracount = useracountService.findUseracountById(userVerify.getId_user());
            if (useracount.isPresent()) {
                if (password_change.equals(password_change_confirm)) {
                    if (BCrypt.checkpw(password_actual, useracount.get().getPassword())) {
                        final String encrypted = BCrypt.hashpw(password_change, BCrypt.gensalt());
                        useracount.get().setPassword(encrypted);
                        useracountService.updateUseracount(useracount.get());
                        session.invalidate();
                        return "redirect:/login";
                    } else {
                        Traductions traductions = new Traductions("No se han encontrado coincidencias","No matches found","No s'han trobat coincidències");
                        model.addAttribute("error", traductions.getTraduction());
                        model.addAttribute("user", useracount.get());
                        if (codeService.findById(new CodesId(useracount.get(),typeCodeRestaurant)).isPresent()) {
                            model.addAttribute("codeEliminar",true);
                        }
                        return "formularios/user_update";
                    }
                } else {
                    Traductions traductions = new Traductions("Las contraseñas a cambiar no coinciden","The passwords to change do not match","Les contrasenyes a canviar no coincideixen");
                    model.addAttribute("error", traductions.getTraduction());
                    model.addAttribute("user", useracount.get());
                    if (codeService.findById(new CodesId(useracount.get(),typeCodeRestaurant)).isPresent()) {
                        model.addAttribute("codeEliminar",true);
                    }
                    return "formularios/user_update";
                }
            }
        }
        return "redirect:/error/401";
    }

    @RequestMapping(value = "/user/delete",method = RequestMethod.POST)
    public String deleteUser(@RequestParam("code") String code,@RequestParam("text_confirmation") String text_confirmation, ModelMap model,HttpServletRequest request,HttpSession session) {
        Useracount userVerify = getUser(request);

        if (isUserCorrect(userVerify,useracountService)) {
            String[] confirm = text_confirmation.split("-");
            if (confirm[0].equals("DELETE") && confirm[1].equals(userVerify.getNombre_usuario())) {
                Optional<Codes> codes = codeService.findById(new CodesId(userVerify,typeCodeUser));
                if (codes.isPresent()) {
                    if (code.equals(codes.get().getCodigo())) {
                        List<Restaurant> restaurants = restaurantService.findRestaurantByUseracount(userVerify.getId_user());
                        if (restaurants.size() != 0) {
                            for (Restaurant restaurant : restaurants) {
                                Optional<Restaurant> restaurantDelete = restaurantService.findRestaurantById(restaurant.getId_restaurante());
                                restaurantDelete.ifPresent(value -> deleteRestaurantLinked(imgService.findImgFromRestaurantId(value.getId_restaurante())));
                            }
                        }
                        useracountService.deleteUseracount(userVerify.getId_user());
                        Traductions traductions = new Traductions("Usuario eliminado correctamente", "The user delete correctly", "El usuari eliminat correctament");
                        model.addAttribute("success", traductions.getTraduction());
                        return "login";
                    }
                } else {
                    Traductions traductions = new Traductions("El codigo no coicide", "Error code not match", "El codi no coicideix");
                    model.addAttribute("error", traductions.getTraduction());
                    return user(model, request);
                }
            }
            Traductions traductions = new Traductions("Error en la confirmacion", "Error in the confirmation", "Error en la confirmació");
            model.addAttribute("error", traductions.getTraduction());
            return user(model, request);
        }
        return "redirect:/error/401";
    }

    public void deleteRestaurantLinked(List<Img> imgs) {
         for (Img single : imgs) {
             Optional<Img> imgSelected = imgService.findImgById(single.getId_img());
             if (imgSelected.isPresent()) {
                 imgService.deleteImg(imgSelected.get().getId_img());
                 String uploadDir = "" + imgSelected.get().getRestaurant().getId_restaurante();
                 FileUploadUtil.deleteImg(uploadDir, imgSelected.get().getUrl());
             }
         }
    }

    @RequestMapping(value = "/user/delete/generate/code",method = RequestMethod.GET)
    public String deleteUser(ModelMap model,HttpServletRequest request) {
        Useracount userVerify = getUser(request);

        if (isUserCorrect(userVerify,useracountService)) {
            Optional<Useracount> useracount = useracountService.findUseracountById(userVerify.getId_user());
            if (useracount.isPresent()) {
                CodesId codesId = new CodesId(useracount.get(),typeCodeUser);
                if (codeService.findById(codesId).isPresent()) {
                    codeService.delete(codesId);
                }
                String result = generateCode(useracount.get(),typeCodeUser);
                emailService.sendMessageWithAttachment(useracount.get().getCorreo(), "Eliminar el usuario" + useracount.get().getNombre_usuario(), useracount.get().getCorreo(),result,"Se ha querido eliminar<br> el usuario");
                Traductions traductions = new Traductions("Se le a enviado un correo a "+useracount.get().getCorreo(),"An email has been sent to "+useracount.get().getCorreo(),"Se li ha enviat un correu a"+useracount.get().getCorreo());
                model.addAttribute("success", traductions.getTraduction());
                return user(model, request);
            }
            return "login";
        }
        return "redirect:/error/401";
    }
}
