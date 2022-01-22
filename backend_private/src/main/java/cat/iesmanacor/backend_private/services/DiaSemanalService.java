package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.DiaSemanal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface DiaSemanalService {
    public List<DiaSemanal> findAll();

    public Page<DiaSemanal> findAll(Pageable pageable);

    public Optional<DiaSemanal> findById(Long id);

    public DiaSemanal save(DiaSemanal diaSemanal);

    public void deleteById(Long id);
}
