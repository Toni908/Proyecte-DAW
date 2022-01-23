package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Carta;
import cat.iesmanacor.backend_private.entities.DiaSemanalPeriodo;
import cat.iesmanacor.backend_private.entities.DiaSemanalPeriodoPKId;
import cat.iesmanacor.backend_private.repositories.DiaSemanalPeriodoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public class DiaSemanalPeriodoServiceImpl implements DiaSemanalPeriodoService{

    @Autowired
    private DiaSemanalPeriodoDAO diaSemanalPeriodoDAO;

    @Override
    @Transactional(readOnly = true)
    public List<DiaSemanalPeriodo> findAll() { return diaSemanalPeriodoDAO.findAll(); }

    @Override
    @Transactional(readOnly = true)
    public Page<DiaSemanalPeriodo> findAll(Pageable pageable) {
        return diaSemanalPeriodoDAO.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DiaSemanalPeriodo> findById(DiaSemanalPeriodoPKId diaSemanalPeriodoPKId) {
        return diaSemanalPeriodoDAO.findById(diaSemanalPeriodoPKId);
    }

    @Override
    @Transactional
    public DiaSemanalPeriodo save(DiaSemanalPeriodo carta) {
        return diaSemanalPeriodoDAO.save(carta);
    }

    @Override
    @Transactional
    public void deleteById(DiaSemanalPeriodoPKId diaSemanalPeriodoPKId) {
        diaSemanalPeriodoDAO.deleteById(diaSemanalPeriodoPKId);
    }

}
