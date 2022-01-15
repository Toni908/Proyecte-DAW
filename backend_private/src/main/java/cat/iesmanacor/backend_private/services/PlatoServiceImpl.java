package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Categoria;
import cat.iesmanacor.backend_private.entities.Plato;
import cat.iesmanacor.backend_private.repositories.PlatoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PlatoServiceImpl implements PlatoService{

    @Autowired
    private PlatoDAO platoDAO;

    @Override
    @Transactional(readOnly = true)
    public List<Plato> findAll() {
        return platoDAO.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Plato> findAll(Pageable pageable) {
        return platoDAO.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Plato> findById(Long id) {
        return platoDAO.findById(id);
    }

    @Override
    @Transactional
    public Plato save(Plato plato) {
        return platoDAO.save(plato);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        platoDAO.deleteById(id);
    }

}
