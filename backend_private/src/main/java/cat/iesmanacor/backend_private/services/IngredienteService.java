package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Ingrediente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface IngredienteService {

    public Iterable<Ingrediente> findAll();

    public Page<Ingrediente> findAll(Pageable pageable);

    public Optional<Ingrediente> findById(Long id);

    public Ingrediente save(Ingrediente categoria);

    public void deleteById(Long id);

}
