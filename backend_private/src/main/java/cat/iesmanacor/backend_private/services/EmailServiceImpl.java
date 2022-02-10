package cat.iesmanacor.backend_private.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.internet.MimeMessage;
import java.math.BigInteger;

@Component
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreplay@restaurantemallorca.me");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    public void sendMessageWithAttachment(String to, String subject, String correo, BigInteger codigo) {
        MimeMessage message = emailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("noreply@restaurantemallorca.me");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlText(correo,codigo),true);

            emailSender.send(message);
        } catch (Exception e) {
            //
        }
    }

    public String htmlText(String correo, BigInteger codigo) {
        return "<body style=\"border: 0; margin: 0; padding: 0; box-sizing: content-box; display: block\">\n" +
                "  <div style=\"width: 40%; height: 150px; background-color: black;\">\n" +
                "    <h1 style=\"color: white; text-align: center; text-transform: uppercase;padding-top: 50px;font-family: 'Quicksand', sans-serif\">Recuperacion de contraseña</h1>\n" +
                "  </div>\n" +
                "    <div style=\"display: flex; flex-direction: column; justify-content: center; width: 40%\">\n" +
                "      <div style=\"width: 100%; height: 100%; border: 1px solid lightgrey; border-radius: 7px;\">\n" +
                "        <h3 style=\"color:dimgrey;text-align: center; font-size: 30px; font-family: 'Quicksand', sans-serif\">Se ha querido cambiar<br> la contraseña del usuario</h3>\n" +
                "        <p style=\"text-align: center\">"+correo+"</p>\n" +
                "        <hr style=\"width: 80%\">\n" +
                "        <p style=\"text-align: center\">El codigo para poder recuperar tu contraseña es</p>\n" +
                "        <section style=\"text-align: center; font-size: 25px; font-weight: bold; padding-bottom: 30px\">\n" +
                "                 "+codigo+"\n" +
                "        </section>\n" +
                "       <p style=\"text-align: center\">Para poder cambiar la contraseña tienes que entrar con tu usuario y en la parte de recuperar insertar el codigo en Codigo verificacion</p>\n"+
                "       <p style=\"text-align: center\">Sino puedes entrar en tu cuenta ves a la secion de ayuda para poder ayudarte</p>\n"+
                "      </div>\n" +
                "    </div>\n" +
                "</body>";
    }
}