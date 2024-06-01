package lk.ijse.skyshoe.service;


import lk.ijse.skyshoe.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {
    UserDetailsService userDetailsService();
    void saveUser(UserDTO userDTO);

    String getRole(String email);

    String getEmployeeCode(String cashierName);

    List<UserDTO> getAllUsers();

    boolean deleteUser(String email);
}
