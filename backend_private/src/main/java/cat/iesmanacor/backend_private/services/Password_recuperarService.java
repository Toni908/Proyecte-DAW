package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Password_recuperar;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface Password_recuperarService {
    public List<Password_recuperar> findAll();

    public Optional<Password_recuperar> findById(BigInteger id);

    public Password_recuperar save(Password_recuperar password);

    public void delete(BigInteger id);

    public void update(Password_recuperar password);

    // QUERY

    public List<Password_recuperar> findByUseracount(BigInteger id);

    public List<Password_recuperar> isCodeFromUseracount(BigInteger user, BigInteger code);

    void deleteCodesFromUseracount(BigInteger user);
}
