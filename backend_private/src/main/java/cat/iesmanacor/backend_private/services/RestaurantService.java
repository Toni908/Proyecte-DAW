package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entities.Restaurant;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface RestaurantService {
    public List<Restaurant> findAllRestaurants();

    public Optional<Restaurant> findRestaurantById(BigInteger id);

    public Restaurant saveRestaurant(Restaurant restaurantNew);

    public void deleteRestaurant(BigInteger id);

    public void updateRestaurant(Restaurant restaurantNew);

    //QUERYS

    List<Restaurant> findRestaurantByValidated(boolean validated);

    List<Restaurant> findRestaurantByVisible(boolean visible);

    List<Restaurant> findRestaurantByNombre(String nombre);

    List<Restaurant> findRestaurantById_Membresia(BigInteger id_membresia);

    List<Restaurant> findRestaurantByUseracount(BigInteger id_user);
}
