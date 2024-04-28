package lk.ijse.skyshoe.dto;

import lk.ijse.skyshoe.entity.enums.Gender;
import lk.ijse.skyshoe.entity.enums.LoyaltyLevel;
import lombok.Getter;

import java.util.Date;

public record CustomerDTORecode(
        String customerId,
        String customerName,
        Gender gender,
        Date joinDate,
        LoyaltyLevel level,
        int totalPoints,
        Date birthday,
        String contactNo,
        String email,
        String addressNoOrName,
        String addressLane,
        String addressCity,
        String addressState,
        String postalCode ) {


}
