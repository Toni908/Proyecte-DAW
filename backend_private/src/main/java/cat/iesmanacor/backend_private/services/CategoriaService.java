package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Categoria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CategoriaService {

    public Iterable<Categoria> findAll();

    public Page<Categoria> findAll(Pageable pageable);

    public Optional<Categoria> findById(Long id);

    public Categoria save(Categoria categoria);

    public void deleteById(Long id);

}
