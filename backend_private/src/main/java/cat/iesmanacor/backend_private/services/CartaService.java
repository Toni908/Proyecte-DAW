package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Carta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface CartaService {

    public List<Carta> findAll();

    public Page<Carta> findAll(Pageable pageable);

    public Optional<Carta> findById(Long id);

    public Carta save(Carta carta);

    public void deleteById(Long id);
}
