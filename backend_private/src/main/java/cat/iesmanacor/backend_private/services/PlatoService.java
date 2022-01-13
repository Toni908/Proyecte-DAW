package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Categoria;
import cat.iesmanacor.backend_private.entities.Plato;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface PlatoService {

    public Iterable<Plato> findAll();

    public Page<Plato> findAll(Pageable pageable);

    public Optional<Plato> findById(Long id);

    public Plato save(Plato plato);

    public void deleteById(Long id);

}
