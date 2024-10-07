package lk.ijse.skyshoe.repo;

import lk.ijse.skyshoe.entity.Customer;
import lk.ijse.skyshoe.entity.ItemSale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemSaleRepo extends JpaRepository<ItemSale,String> {
}
