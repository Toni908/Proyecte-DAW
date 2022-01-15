package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Ingrediente;
import cat.iesmanacor.backend_private.repositories.IngredienteDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class IngredienteServiceImpl implements IngredienteService{

    @Autowired
    private IngredienteDAO ingredienteDAO;

    @Override
    @Transactional(readOnly = true)
    public List<Ingrediente> findAll() {
        return ingredienteDAO.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Ingrediente> findAll(Pageable pageable) {
        return ingredienteDAO.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Ingrediente> findById(Long id) {
        return ingredienteDAO.findById(id);
    }

    @Override
    @Transactional
    public Ingrediente save(Ingrediente ingrediente) {
        return ingredienteDAO.save(ingrediente);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        ingredienteDAO.deleteById(id);
    }

}
