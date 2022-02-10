package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.componentes.User;
import cat.iesmanacor.backend_private.entities.Password_recuperar;
import cat.iesmanacor.backend_private.entities.Useracount;
import cat.iesmanacor.backend_private.entityDTO.UseracountDTO;
import cat.iesmanacor.backend_private.services.EmailService;
import cat.iesmanacor.backend_private.services.Password_recuperarService;
import cat.iesmanacor.backend_private.services.UseracountService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import javax.validation.Valid;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
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
    Password_recuperarService password_recuperarService;

    @GetMapping("/user")
    public String user(ModelMap model, HttpServletRequest request){
        Useracount useracount = getUser(request);

        if (isUserCorrect(useracount,useracountService)) {
            Optional<Useracount> useracountDDBB = useracountService.findUseracountById(useracount.getId_user());
            if (useracountDDBB.isPresent()) {
                model.addAttribute("hascode",password_recuperarService.findByUseracount(useracountDDBB.get().getId_user()).isEmpty());
                model.addAttribute("user", useracountDDBB.get());
                return "formularios/user_update";
            }
        }
        return "redirect:/error/401";
    }

    @RequestMapping("/user/verified")
    public String verified(@RequestParam("verified") String verified, ModelMap model, HttpServletRequest request){
        Useracount userVerify = getUser(request);

        if (isUserCorrect(userVerify,useracountService)) {
            // ID Y CONTRASEÑA TIENEN QUE SER IGUALES
            Optional<Useracount> useracount = useracountService.findUseracountById(userVerify.getId_user());
            if (useracount.isPresent()) {
                if (BCrypt.checkpw(verified, useracount.get().getPassword())) {
                    model.addAttribute("verified",true);
                    model.addAttribute("hascode",password_recuperarService.findByUseracount(useracount.get().getId_user()).isEmpty());
                    model.addAttribute("success","Ya puedes ver la informacion importante");
                    model.addAttribute("user", useracount.get());
                    return "formularios/user_update";
                }
            }
        }
        return "redirect:/error/401";
    }

    @RequestMapping("/user/put")
    public String put(@ModelAttribute @Valid UseracountDTO useracount, BindingResult errors, HttpServletRequest request, HttpSession session){
        Useracount userVerify = getUser(request);

        //Errores redirect
        if (errors.hasErrors()) {
            return "redirect:/error/401";
        }

        if (isUserCorrect(userVerify,useracountService)) {
            // ID Y CONTRASEÑA TIENEN QUE SER IGUALES
            Optional<Useracount> useracountDDBB = useracountService.findUseracountById(userVerify.getId_user());
            if (useracountDDBB.isPresent()) {
                useracountDDBB.get().setNombre_usuario(useracount.getNombre_usuario());
                useracountDDBB.get().setNombre(useracount.getNombre());
                useracountDDBB.get().setApellido1(useracount.getApellido1());
                useracountDDBB.get().setApellido2(useracount.getApellido2());
                useracountDDBB.get().setTelefono(useracount.getTelefono());
                useracountService.updateUseracount(useracountDDBB.get());
                session.invalidate();
                return "redirect:/login";
            }
        }
        return "redirect:/error/401";
    }

    // PUEDE ENTRAR EN EL USUARIO
    @RequestMapping("/user/recuperar")
    public String recuperar(@RequestParam("codigo_email") BigInteger code,@RequestParam("password_change_recuperar") String password_change_recuperar, @RequestParam("password_change_confirm_recuperar") String password_change_confirm_recuperar, ModelMap model, HttpServletRequest request,HttpSession session) {
        Optional<Password_recuperar> password_recuperar = password_recuperarService.findById(code);
        Useracount userVerify = getUser(request);
        if (password_recuperar.isPresent()) {
            if (isUserCorrect(userVerify,useracountService)) {
                if (isCodeFromThisUseracount(code,userVerify)) {
                    if (password_change_recuperar.equals(password_change_confirm_recuperar)) {
                        Optional<Useracount> useracountDDBB = useracountService.findUseracountById(userVerify.getId_user());
                        if (useracountDDBB.isPresent()) {
                            final String encrypted = BCrypt.hashpw(password_change_recuperar, BCrypt.gensalt());
                            useracountDDBB.get().setPassword(encrypted);
                            useracountService.updateUseracount(useracountDDBB.get());
                            password_recuperarService.delete(code);
                            session.invalidate();
                            return "redirect:/login";
                        } else {
                            model.addAttribute("error", "No se han encontrado coicidencias");
                            model.addAttribute("user", userVerify);
                            return "formularios/user_update";
                        }
                    }
                }
            }
        }
        return "redirect:/error/401";
    }

    public boolean isCodeFromThisUseracount(BigInteger code, Useracount useracount) {
        return !password_recuperarService.isCodeFromUseracount(useracount.getId_user(),code).isEmpty();
    }

    // NO PUEDE ENTRAR EN EL USUARIO
    @RequestMapping("/recuperar/password")
    public String recuperarPassword(@RequestParam("code") BigInteger code, @RequestParam("dni") String dni, @RequestParam("nombre_usuario") String nombre_usuario, @RequestParam("password") String password, @RequestParam("password_confirm") String password_confirm, ModelMap model,HttpSession session) {
        Optional<Password_recuperar> password_recuperar = password_recuperarService.findById(code);

        if (password_recuperar.isPresent()) {
            Optional<Useracount> useracount = useracountService.findUseracountById(password_recuperar.get().getUseracount().getId_user());
            if (useracount.isPresent()) {
                if (password_recuperar.get().getUseracount().getDni().equals(dni)) {
                    if (password_recuperar.get().getUseracount().getNombre_usuario().equals(nombre_usuario)) {
                        if (password.equals(password_confirm)) {
                            final String encrypted = BCrypt.hashpw(password, BCrypt.gensalt());
                            useracount.get().setPassword(encrypted);
                            useracountService.updateUseracount(useracount.get());
                            password_recuperarService.delete(code);
                            session.invalidate();
                            return "redirect:/login";
                        } else {
                            model.addAttribute("error", "La contraseñas no coiciden");
                            return "recuperar";
                        }
                    }
                }
                model.addAttribute("error", "Credenciales no coiciden");
                return "recuperar";
            }
        }
        return "redirect:/error/401";
    }



    @RequestMapping("/send/code")
    public String codeSend(@RequestParam("email_actual") String email_actual, ModelMap model) {
        List<Useracount> useracount = useracountService.findUseracountsByEmail(email_actual);
        if (!useracount.isEmpty()) {
            if (useracount.size()==1) {
                if (password_recuperarService.findByUseracount(useracount.get(0).getId_user()).isEmpty()) {
                    BigInteger generateCode = generateCode(useracount.get(0));
                    emailService.sendMessageWithAttachment("militaxx98@gmail.com", "Recuperar contraseña", email_actual, generateCode);
                    model.addAttribute("hasSend",true);
                    model.addAttribute("success","Se envio un correo con el codigo");
                } else {
                    model.addAttribute("hasSend",false);
                    model.addAttribute("error","Ya se envio un correo con el codigo");
                }
                return "recuperar";
            }
        } else {
            model.addAttribute("error","El correo no se encuentra en ningun registro");
            return "recuperar";
        }
        return "redirect:/error/401";
    }

    @Transactional
    @RequestMapping("/regererar/code")
    public String regenerarCode(@RequestParam("email_actual") String email_actual) {
        List<Useracount> useracount = useracountService.findUseracountsByEmail(email_actual);
        if (!useracount.isEmpty()) {
            password_recuperarService.deleteCodesFromUseracount(useracount.get(0).getId_user());
        }
        return "recuperar";
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
                BigInteger generateCode = generateCode(useracount.get());
                emailService.sendMessageWithAttachment("militaxx98@gmail.com", "Recuperar contraseña del usuario" + useracount.get().getNombre_usuario(), useracount.get().getCorreo(),generateCode);
                model.addAttribute("hascode",password_recuperarService.findByUseracount(useracount.get().getId_user()).isEmpty());
                model.addAttribute("success","Se le a enviado un correo a "+useracount.get().getCorreo());
                model.addAttribute("user", useracount.get());
                return "formularios/user_update";
            }
        }
        return "redirect:/error/401";
    }

    public BigInteger generateCode(Useracount id) {
        Optional<Password_recuperar> password;
        BigInteger randomNum = BigInteger.ONE;
        boolean empty = true;
        while (empty) {
            BigInteger start = BigInteger.valueOf(1000);
            BigInteger end = BigInteger.valueOf(999999999);
            randomNum = RandomBigInteger(start, end);
            password = password_recuperarService.findById(randomNum);
            if (password.isEmpty()) {
                empty = false;
            }
        }
        Password_recuperar password_recuperar = new Password_recuperar(id, randomNum);
        password_recuperarService.save(password_recuperar);
        return randomNum;
    }

    private static BigInteger RandomBigInteger(BigInteger rangeStart, BigInteger rangeEnd){

        Random rand = new Random();
        int scale = rangeEnd.toString().length();
        String generated = "";
        for(int i = 0; i < rangeEnd.toString().length(); i++){
            generated += rand.nextInt(10);
        }
        BigDecimal inputRangeStart = new BigDecimal("0").setScale(scale, RoundingMode.FLOOR);
        BigDecimal inputRangeEnd = new BigDecimal(String.format("%0" + (rangeEnd.toString().length()) +  "d", 0).replace('0', '9')).setScale(scale, RoundingMode.FLOOR);
        BigDecimal outputRangeStart = new BigDecimal(rangeStart).setScale(scale, RoundingMode.FLOOR);
        BigDecimal outputRangeEnd = new BigDecimal(rangeEnd).add(new BigDecimal("1")).setScale(scale, RoundingMode.FLOOR); //Adds one to the output range to correct rounding

        //Calculates: (generated - inputRangeStart) / (inputRangeEnd - inputRangeStart) * (outputRangeEnd - outputRangeStart) + outputRangeStart
        BigDecimal bd1 = new BigDecimal(new BigInteger(generated)).setScale(scale, RoundingMode.FLOOR).subtract(inputRangeStart);
        BigDecimal bd2 = inputRangeEnd.subtract(inputRangeStart);
        BigDecimal bd3 = bd1.divide(bd2, RoundingMode.FLOOR);
        BigDecimal bd4 = outputRangeEnd.subtract(outputRangeStart);
        BigDecimal bd5 = bd3.multiply(bd4);
        BigDecimal bd6 = bd5.add(outputRangeStart);

        BigInteger returnInteger = bd6.setScale(0, RoundingMode.FLOOR).toBigInteger();
        returnInteger = (returnInteger.compareTo(rangeEnd) > 0 ? rangeEnd : returnInteger); //Converts number to the end of output range if it's over it. This is to correct rounding.
        return returnInteger;
    }

    // CAMBIAR CONTRASEÑA SI TE SABES LA ACTUAL
    @RequestMapping("/user/changepassword")
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
                        model.addAttribute("error", "No se han encontrado coicidencias");
                        model.addAttribute("user", userVerify);
                        return "formularios/user_update";
                    }
                } else {
                    model.addAttribute("error","Las contraseñas a cambiar no coiciden");
                    model.addAttribute("user", userVerify);
                    return "formularios/user_update";
                }
            }
        }
        return "redirect:/error/401";
    }
}
