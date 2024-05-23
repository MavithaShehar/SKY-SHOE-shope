package lk.ijse.skyshoe.repo;

import lk.ijse.skyshoe.dto.StockDTO;
import lk.ijse.skyshoe.entity.Item;
import lk.ijse.skyshoe.entity.Stock;
import lk.ijse.skyshoe.entity.Suppliers;
import lk.ijse.skyshoe.entity.enums.Colour;
import lk.ijse.skyshoe.entity.enums.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;


public interface StockRepo extends JpaRepository<Stock,String> {

    @Query(value = "SELECT * FROM stock WHERE colour = ?1 AND size = ?2 ", nativeQuery = true)
    Stock findByColourSizeAndItemCode(Colour colour, Size size);

}
