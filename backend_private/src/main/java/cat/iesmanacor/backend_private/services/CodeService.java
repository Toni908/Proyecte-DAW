package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Codes;
import cat.iesmanacor.backend_private.entities.CodesId;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface CodeService {
    public List<Codes> findAll();

    public Optional<Codes> findById(CodesId id);

    public Codes save(Codes code);

    public void delete(CodesId id);

    public void update(Codes code);

    // QUERY

    List<Codes> findFromCodesAndUseracount(BigInteger user, String code);

    List<Codes> findFromTypesAndCodes(String codigo, String type);
}
