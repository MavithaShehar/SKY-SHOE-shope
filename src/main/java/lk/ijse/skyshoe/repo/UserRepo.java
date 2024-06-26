package lk.ijse.skyshoe.repo;


import jakarta.transaction.Transactional;
import lk.ijse.skyshoe.entity.enums.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserEntity,String> {
    Optional<UserEntity> findByEmail(String email);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM user WHERE email = ?1", nativeQuery = true)
    void deleteByEmail(String email);
}
