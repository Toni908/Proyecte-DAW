package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Periodo;
import cat.iesmanacor.backend_private.repositories.PeriodoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public class PeriodoServiceImpl implements PeriodoService{

    @Autowired
    private PeriodoDAO periodoDAO;

    @Override
    @Transactional(readOnly = true)
    public List<Periodo> findAll() {
        return periodoDAO.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Periodo> findAll(Pageable pageable) {
        return periodoDAO.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Periodo> findById(Long id) {
        return periodoDAO.findById(id);
    }

    @Override
    @Transactional
    public Periodo save(Periodo periodo) {
        return periodoDAO.save(periodo);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        periodoDAO.deleteById(id);
    }

}
