package lk.ijse.skyshoe.dto;

import lk.ijse.skyshoe.entity.enums.SupplierCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class SuppliersDTO {

    private String supplierId;
    private String supplierName;
    private SupplierCategory supplierCategory;
    private String mobileNo;
    private String landLineNo;
    private String email;
    private String addressNoOrName;
    private String addressLane;
    private String addressState;
    private String addressCity;
    private String postalCode;
    private String country;
}
