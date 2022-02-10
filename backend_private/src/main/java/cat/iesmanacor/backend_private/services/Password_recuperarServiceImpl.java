package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Password_recuperar;
import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.repositories.Password_recuperarRepository;
import cat.iesmanacor.backend_private.repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Service
public class Password_recuperarServiceImpl implements Password_recuperarService{

    @Autowired
    Password_recuperarRepository password_recuperarRepository;

    @Override
    public List<Password_recuperar> findAll() {
        return password_recuperarRepository.findAll();
    }

    @Override
    public Optional<Password_recuperar> findById(BigInteger id) {
        return password_recuperarRepository.findById(id);
    }

    @Override
    public Password_recuperar save(Password_recuperar password) {
        if (password != null) {
            return password_recuperarRepository.save(password);
        }
        return new Password_recuperar();
    }

    @Override
    public void delete(BigInteger id) {
        if (password_recuperarRepository.findById(id).isPresent()) {
            password_recuperarRepository.deleteById(id);
        }
    }

    @Override
    public void update(Password_recuperar password) {
        BigInteger num = password.getId_user();
        if (password_recuperarRepository.findById(num).isPresent()) {
            Password_recuperar result = new Password_recuperar(
                    password.getId_user(),
                    password.getPassword(),
                    password.getCodigo()
            );
            password_recuperarRepository.save(result);
        }
    }
}
