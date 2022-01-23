package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Carta;
import cat.iesmanacor.backend_private.entities.DiaSemanalPeriodo;
import cat.iesmanacor.backend_private.entities.DiaSemanalPeriodoPKId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface DiaSemanalPeriodoService {
    public List<DiaSemanalPeriodo> findAll();

    public Page<DiaSemanalPeriodo> findAll(Pageable pageable);

    public Optional<DiaSemanalPeriodo> findById(DiaSemanalPeriodoPKId diaSemanalPeriodoPKId);

    public DiaSemanalPeriodo save(DiaSemanalPeriodo diaSemanalPeriodo);

    public void deleteById(DiaSemanalPeriodoPKId diaSemanalPeriodoPKId);
}
