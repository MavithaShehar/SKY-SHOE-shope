package lk.ijse.skyshoe.repo;

import lk.ijse.skyshoe.entity.Item;
import lk.ijse.skyshoe.service.CrudService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepo extends JpaRepository<Item,String> {
}
