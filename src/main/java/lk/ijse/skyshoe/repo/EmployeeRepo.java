package lk.ijse.skyshoe.repo;

import lk.ijse.skyshoe.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee,String> {
}
