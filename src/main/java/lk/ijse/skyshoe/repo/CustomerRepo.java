package lk.ijse.skyshoe.repo;

import lk.ijse.skyshoe.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer,String> {
}
