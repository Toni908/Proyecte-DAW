package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Img;
import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    RestaurantRepository restaurantRepository;

    @Override
    @Transactional
    public List<Restaurant> findAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    @Transactional
    public Optional<Restaurant> findRestaurantById(BigInteger id) {
        Optional<Restaurant> restaurant = restaurantRepository.findById(id);
        return restaurant;
    }

    @Override
    @Transactional
    public Restaurant saveRestaurant(Restaurant restaurantNew) {
        if (restaurantNew != null) {
            return restaurantRepository.save(restaurantNew);
        }
        return new Restaurant();
    }

    @Override
    @Transactional
    public void deleteRestaurant(BigInteger id) {
        if (restaurantRepository.findById(id).isPresent()) {
            restaurantRepository.deleteById(id);
        }
    }

    @Override
    @Transactional
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
    @Transactional
    public List<Restaurant> findRestaurantByValidated(boolean validated) {
        return restaurantRepository.findRestaurantByValidated(validated);
    }

    @Override
    @Transactional
    public List<Restaurant> findRestaurantByVisible(boolean visible) {
        return restaurantRepository.findRestaurantByVisible(visible);
    }

    @Override
    @Transactional
    public List<Restaurant> findRestaurantByNombre(String nombre) {
        return restaurantRepository.findRestaurantByNombre(nombre);
    }

    @Override
    @Transactional
    public List<Restaurant> findRestaurantById_Membresia(BigInteger id_membresia) {
        return restaurantRepository.findRestaurantById_Membresia(id_membresia);
    }

    @Override
    @Transactional
    public List<Restaurant> findRestaurantByUseracount(BigInteger id_user) {
        return restaurantRepository.findRestaurantByUseracount(id_user);
    }
}
