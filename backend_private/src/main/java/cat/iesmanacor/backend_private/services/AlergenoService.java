package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Alergeno;
import cat.iesmanacor.backend_private.entities.Carta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface AlergenoService {

    public List<Alergeno> findAll();

    public Page<Alergeno> findAll(Pageable pageable);

    public Optional<Alergeno> findById(Long id);

    public Alergeno save(Alergeno alergeno);

    public void deleteById(Long id);

}
