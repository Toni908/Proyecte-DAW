package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Horario;
import cat.iesmanacor.backend_private.repositories.HorarioDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class HorarioServiceImpl implements HorarioService{
    @Autowired
    private HorarioDAO horarioDAO;

    @Override
    @Transactional(readOnly = true)
    public List<Horario> findAll() {
        return horarioDAO.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Horario> findAll(Pageable pageable) {
        return horarioDAO.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Horario> findById(Long id) {
        return horarioDAO.findById(id);
    }

    @Override
    @Transactional
    public Horario save(Horario horario) {
        return horarioDAO.save(horario);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        horarioDAO.deleteById(id);
    }
}
