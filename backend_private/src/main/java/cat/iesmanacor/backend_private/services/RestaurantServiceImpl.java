package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    RestaurantRepository restaurantRepository;

    @Override
    public List<Restaurant> findAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    public Optional<Restaurant> findRestaurantById(BigInteger id) {
        Optional<Restaurant> restaurant = restaurantRepository.findById(id);
        return restaurant;
    }

    @Override
    public Restaurant saveRestaurant(Restaurant restaurantNew) {
        if (restaurantNew != null) {
            return restaurantRepository.save(restaurantNew);
        }
        return new Restaurant();
    }

    @Override
    public void deleteRestaurant(BigInteger id) {
        if (restaurantRepository.findById(id).isPresent()) {
            restaurantRepository.deleteById(id);
        }
    }

    @Override
    public void updateRestaurant(Restaurant restaurantNew) {
        BigInteger num = restaurantNew.getId_restaurante();
        if (restaurantRepository.findById(num).isPresent()) {
            Restaurant customerToUpdate = new Restaurant(
                    restaurantNew.getId_restaurante(),
                    restaurantNew.getNombre(),
                    restaurantNew.getDies_anticipacion_reservas(),
                    restaurantNew.getTelefono_restaurante(),
                    restaurantNew.isValidated(),
                    restaurantNew.getLocalidad(),
                    restaurantNew.getMembresia(),
                    restaurantNew.getUseracount(),
                    restaurantNew.isVisible()
            );
            restaurantRepository.save(customerToUpdate);
        }
    }

    @Override
    public List<Restaurant> findRestaurantByValidated(boolean validated) {
        return restaurantRepository.findRestaurantByValidated(validated);
    }

    @Override
    public List<Restaurant> findRestaurantByVisible(boolean visible) {
        return restaurantRepository.findRestaurantByVisible(visible);
    }

    @Override
    public List<Restaurant> findRestaurantByNombre(String nombre) {
        return restaurantRepository.findRestaurantByNombre(nombre);
    }

    @Override
    public List<Restaurant> findRestaurantById_Membresia(BigInteger id_membresia) {
        return restaurantRepository.findRestaurantById_Membresia(id_membresia);
    }
}
