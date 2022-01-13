package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Categoria;
import cat.iesmanacor.backend_private.repositories.CategoriaDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CategoriaServiceImpl implements CategoriaService{

    @Autowired
    private CategoriaDAO categoriaDAO;

    @Override
    @Transactional(readOnly = true)
    public Iterable<Categoria> findAll() {
        return categoriaDAO.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Categoria> findAll(Pageable pageable) {
        return categoriaDAO.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Categoria> findById(Long id) {
        return categoriaDAO.findById(id);
    }

    @Override
    @Transactional
    public Categoria save(Categoria categoria) {
        return categoriaDAO.save(categoria);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        categoriaDAO.deleteById(id);
    }

}
