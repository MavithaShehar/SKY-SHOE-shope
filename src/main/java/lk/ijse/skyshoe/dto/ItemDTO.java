package lk.ijse.skyshoe.dto;

import lk.ijse.skyshoe.entity.enums.ItemCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItemDTO {
    private String itemCode;
    private String description;
    private String category;
    private double priceBuy;
    private double priceSell;

}
