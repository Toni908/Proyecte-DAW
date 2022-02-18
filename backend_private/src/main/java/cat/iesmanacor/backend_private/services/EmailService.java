package cat.iesmanacor.backend_private.services;

import java.math.BigInteger;

public interface EmailService {
    void sendSimpleMessage(String to, String subject, String text);

    void sendMessageWithAttachment(String to, String subject, String correo, String codigo,String title);
}
