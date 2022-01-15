package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Alergeno;
import cat.iesmanacor.backend_private.entities.Carta;
import cat.iesmanacor.backend_private.repositories.AlergenoDAO;
import cat.iesmanacor.backend_private.repositories.CartaDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AlergenoServiceImpl implements AlergenoService{

    @Autowired
    private AlergenoDAO alergenoDAO;

    @Override
    @Transactional(readOnly = true)
    public List<Alergeno> findAll() {
        return alergenoDAO.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Alergeno> findAll(Pageable pageable) {
        return alergenoDAO.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Alergeno> findById(Long id) {
        return alergenoDAO.findById(id);
    }

    @Override
    @Transactional
    public Alergeno save(Alergeno alergeno) {
        return alergenoDAO.save(alergeno);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        alergenoDAO.deleteById(id);
    }

}
