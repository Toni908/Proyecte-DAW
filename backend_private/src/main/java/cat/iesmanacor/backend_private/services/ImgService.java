package cat.iesmanacor.backend_private.services;


import cat.iesmanacor.backend_private.entities.Img;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface ImgService {
    public List<Img> findAllImgs();

    public Optional<Img> findImgById(BigInteger id);

    public Img saveImg(Img imgNew);

    public void deleteImg(BigInteger id);

    public void updateImg(Img img);

    // QUERY

    public List<Img> findImgByUrl(String url);

    List<Img> findImgFromRestaurantByUseracount(BigInteger id);
}
