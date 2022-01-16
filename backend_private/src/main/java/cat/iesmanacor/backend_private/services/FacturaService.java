package cat.iesmanacor.backend_private.services;


import cat.iesmanacor.backend_private.entities.Factura;

import java.util.List;
import java.util.Optional;

public interface FacturaService {
    public List<Factura> findAllFactura();

    public Optional<Factura> findFacturaById(String id);

    public Factura saveFactura(Factura facturaNew);

    public void deleteFactura(String id);

    public void updateFactura(Factura factura);
}
