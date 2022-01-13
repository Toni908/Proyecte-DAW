package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Carta;
import cat.iesmanacor.backend_private.repositories.CartaDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartaServiceImpl implements CartaService {

    @Autowired
    private CartaDAO cartaDAO;

    @Override
    @Transactional(readOnly = true)
    public List<Carta> findAll() { return cartaDAO.findAll(); }

    @Override
    @Transactional(readOnly = true)
    public Page<Carta> findAll(Pageable pageable) {
        return cartaDAO.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Carta> findById(Long id) {
        return cartaDAO.findById(id);
    }

    @Override
    @Transactional
    public Carta save(Carta carta) {
        return cartaDAO.save(carta);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        cartaDAO.deleteById(id);
    }
}
