package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Useracount;
import cat.iesmanacor.backend_private.repositories.UseracountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Service
public class UseracountServiceImpl implements UseracountService {

    @Autowired
    UseracountRepository useracountRepository;

    @Override
    @Transactional
    public List<Useracount> findAllUseracount() {
        return useracountRepository.findAll();
    }

    @Override
    @Transactional
    public Optional<Useracount> findUseracountById(BigInteger id) {
        return useracountRepository.findById(id);
    }

    @Override
    @Transactional
    public Useracount saveUseracount(Useracount useracountnew) {
        if (useracountnew != null) {
            return useracountRepository.save(useracountnew);
        }
        return new Useracount();
    }

    @Override
    @Transactional
    public void deleteUseracount(BigInteger id) {
        if (useracountRepository.findById(id).isPresent()) {
            useracountRepository.deleteById(id);
        }
    }

    @Override
    @Transactional
    public void updateUseracount(Useracount useracount) {
        BigInteger num = useracount.getId_user();
        if (useracountRepository.findById(num).isPresent()) {
            Useracount useracountUpdate = new Useracount(
                    useracount.getId_user(),
                    useracount.getNombre_usuario(),
                    useracount.getPassword(),
                    useracount.getCorreo(),
                    useracount.getTelefono(),
                    useracount.getNombre(),
                    useracount.getApellido1(),
                    useracount.getApellido2(),
                    useracount.getDni(),
                    useracount.isAdmin()
            );
            useracountRepository.save(useracountUpdate);
        }
    }

    @Transactional
    public List<Useracount> findUseracountsByEmail(String email) {
        return useracountRepository.findUseracountsByCorreo(email);
    }

    @Transactional
    public List<Useracount> findUseracountByUsername(String username) {
        return useracountRepository.findUseracountsByUsername(username);
    }
}
