package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Useracount;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface UseracountService {
    public List<Useracount> findAllUseracount();

    public Optional<Useracount> findUseracountById(BigInteger id);

    public Useracount saveUseracount(Useracount useracountnew);

    public void deleteUseracount(BigInteger id);

    public void updateUseracount(Useracount useracount);

    // QUERY

    public List<Useracount> findUseracountsByEmail(String correo);

    public List<Useracount> findUseracountByUsername(String correo);

    public List<Useracount> findUseracountByDNI(String correo);

    public List<Useracount> loginAccount(String correo, String contraseña);
}
