package cat.iesmanacor.backend_private.repositories;

import cat.iesmanacor.backend_private.entities.Factura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacturaRepository extends JpaRepository<Factura,String> { }
