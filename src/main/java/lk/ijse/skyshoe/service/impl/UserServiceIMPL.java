package lk.ijse.skyshoe.service.impl;


import jakarta.transaction.Transactional;
import lk.ijse.skyshoe.dto.UserDTO;
import lk.ijse.skyshoe.entity.enums.UserEntity;
import lk.ijse.skyshoe.repo.UserRepo;
import lk.ijse.skyshoe.service.UserService;
import lk.ijse.skyshoe.util.map.Mapping;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceIMPL implements UserService {


    private final UserRepo userRepo;
    private final Mapping mapping;

    @Override
    public UserDetailsService userDetailsService() {
        return username ->
                userRepo.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public void saveUser(UserDTO userDTO) {

        mapping.toUserDTO(userRepo.save(mapping.toUserEntity(userDTO)));
    }

    @Override
    public String getRole(String email) {
        return userRepo.findByEmail(email)
                .map(userEntity -> userEntity.getRole().name())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    }

    @Override
    public String getEmployeeCode(String cashierName) {
        Optional<UserEntity> user = userRepo.findByEmail(cashierName);
        return user.map(UserEntity::getEmployee_code).orElse(null);

    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<UserDTO> userDTOs = mapping.toUserDTOs(userRepo.findAll());

        for (UserDTO userDTO : userDTOs) {
            userDTO.setPassword(null);

        }
        return userDTOs;
    }

    @Override
    public boolean deleteUser(String email) {
        userRepo.deleteByEmail(email);
        return true;
    }
}

