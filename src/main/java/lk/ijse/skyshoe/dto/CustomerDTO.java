package lk.ijse.skyshoe.dto;

import lk.ijse.skyshoe.entity.enums.Gender;
import lk.ijse.skyshoe.entity.enums.LoyaltyLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class CustomerDTO {
    private String customerId;
    private String customerName;
    private Gender gender;
    private Date joinDate;
    private LoyaltyLevel level;
    private int totalPoints;
    private Date birthday;
    private String contactNo;
    private String email;
    private String addressNoOrName;
    private String addressLane;
    private String addressCity;
    private String addressState;
    private String postalCode;
   // private List<SaleDTO> saleList;
}
