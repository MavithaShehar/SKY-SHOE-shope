package lk.ijse.skyshoe.dto;


import lk.ijse.skyshoe.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserDTO  {
    private String id;
    private String email;
    private String password;
    private Role role;
    private String employee_code;
}
