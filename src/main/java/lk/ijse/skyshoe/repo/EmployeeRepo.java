package lk.ijse.skyshoe.repo;

import lk.ijse.skyshoe.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee,String> {
    Optional<Employee> findByEmail(String email);

    @Query(value = " SELECT * FROM employee WHERE email = ?1;", nativeQuery = true)
    Employee getSelectEmployee(String userEmail);

}
