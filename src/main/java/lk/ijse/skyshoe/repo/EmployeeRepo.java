package lk.ijse.skyshoe.repo;

import lk.ijse.skyshoe.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee,String> {
    Optional<Employee> findByEmail(String email);

}
