package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.DiaSemanal;
import cat.iesmanacor.backend_private.repositories.DiaSemanalDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public class DiaSemanalServiceImpl implements DiaSemanalService{

    @Autowired
    private DiaSemanalDAO diaSemanalDAO;

    @Override
    @Transactional(readOnly = true)
    public List<DiaSemanal> findAll() {
        return diaSemanalDAO.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DiaSemanal> findAll(Pageable pageable) {
        return diaSemanalDAO.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DiaSemanal> findById(Long id) {
        return diaSemanalDAO.findById(id);
    }

    @Override
    @Transactional
    public DiaSemanal save(DiaSemanal diaSemanal) {
        return diaSemanalDAO.save(diaSemanal);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        diaSemanalDAO.deleteById(id);
    }
}
