package lk.ijse.skyshoe.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lk.ijse.skyshoe.entity.enums.SupplierCategory;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
//@Data
@Setter
@Getter
@Entity
public class Suppliers {
    @Id
    private String supplierId;
    private String supplierName;

    @Enumerated(EnumType.STRING)
    private SupplierCategory supplierCategory;

    private String mobileNo;
    private String landLineNo;

    @Column(unique = true)
    private String email;

    private String addressNoOrName;
    private String addressLane;
    private String addressState;
    private String addressCity;
    private String postalCode;
    private String country;

    @OneToMany(mappedBy = "suppliers" , cascade = CascadeType.ALL , fetch = FetchType.LAZY)
   @JsonBackReference
    private List<Item> itemList;

}
