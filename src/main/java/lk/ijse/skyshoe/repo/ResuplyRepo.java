package lk.ijse.skyshoe.repo;

import lk.ijse.skyshoe.entity.Resupply;
import lk.ijse.skyshoe.entity.Stock;
import lk.ijse.skyshoe.entity.enums.Colour;
import lk.ijse.skyshoe.entity.enums.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ResuplyRepo extends JpaRepository<Resupply,String> {

//    @Query(value = "SELECT s FROM Stock s WHERE s.colour = :colour AND s.size = :size AND s.item.itemCode = :itemCode",nativeQuery = true)
//    Stock findByColourSizeAndItemCode(Colour colour, Size size, String itemCode);
}
