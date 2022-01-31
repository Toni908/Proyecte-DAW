package cat.iesmanacor.backend_private.services;

public interface EmailService {
    void sendSimpleMessage(String to, String subject, String text);
}
