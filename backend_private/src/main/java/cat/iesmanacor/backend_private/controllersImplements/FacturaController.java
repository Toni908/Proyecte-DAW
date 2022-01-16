package cat.iesmanacor.backend_private.controllersImplements;

import cat.iesmanacor.backend_private.entities.Factura;
import org.springframework.ui.ModelMap;

public interface FacturaController {
    public String show(ModelMap model);

    public String findFacturaById(String id, ModelMap model);

    public void saveFactura(Factura factura);

    public void deleteFacturaById(String id);

    public void updateFactura(Factura facturaNew);
}
