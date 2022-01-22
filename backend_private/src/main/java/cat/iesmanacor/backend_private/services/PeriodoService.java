package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Periodo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface PeriodoService {
    public List<Periodo> findAll();

    public Page<Periodo> findAll(Pageable pageable);

    public Optional<Periodo> findById(Long id);

    public Periodo save(Periodo periodo);

    public void deleteById(Long id);

}
