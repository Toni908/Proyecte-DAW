package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Horario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface HorarioService {
    public List<Horario> findAll();

    public Page<Horario> findAll(Pageable pageable);

    public Optional<Horario> findById(Long id);

    public Horario save(Horario horario);

    public void deleteById(Long id);
}
