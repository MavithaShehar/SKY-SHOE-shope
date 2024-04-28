package lk.ijse.skyshoe.dto;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lk.ijse.skyshoe.entity.enums.Gender;
import lk.ijse.skyshoe.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class EmployeeDTO {

    private String employeeId;
    private String employeeName;
    private String profilePic;
    private Gender gender;
    private String status;
    private String designation;
    private Role accessRole;
    private Date birthday;
    private Date joinDate;
    private String branch;
    private String contactNo;
    private String email;
    private String addressNoOrName;
    private String addressLane;
    private String addressCity;
    private String addressState;
    private String postalCode;
    private String password;
    private String emergencyContactPerson;
    private String emergencyContactNumber;
}
