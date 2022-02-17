package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Codes;
import cat.iesmanacor.backend_private.entities.CodesId;
import cat.iesmanacor.backend_private.repositories.CodesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Service
public class CodesServiceImpl implements CodeService {

    @Autowired
    CodesRepository codesRepository;

    @Override
    public List<Codes> findAll() {
        return codesRepository.findAll();
    }

    @Override
    public Optional<Codes> findById(CodesId id) {
        return codesRepository.findById(id);
    }

    @Override
    public Codes save(Codes code) {
        if (code!=null) {
            return codesRepository.save(code);
        }
        return new Codes();
    }

    @Override
    public void delete(CodesId id) {
        if (codesRepository.findById(id).isPresent()) {
            codesRepository.deleteById(id);
        }
    }

    @Override
    public void update(Codes code) {
        CodesId id = code.getId();
        if (codesRepository.findById(id).isPresent()) {
            Codes codeToUpdate = new Codes(
                    code.getId(),
                    code.getCodigo()
            );
            codesRepository.save(codeToUpdate);
        }
    }

    @Override
    public List<Codes> findFromCodesAndUseracount(BigInteger user, String code) {
        return codesRepository.findFromCodesAndUseracount(user, code);
    }

    @Override
    public List<Codes> findFromTypesAndCodes(String codigo, String type) {
        return codesRepository.findFromTypesAndCodes(codigo, type);
    }
}
