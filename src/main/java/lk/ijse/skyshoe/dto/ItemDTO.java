package lk.ijse.skyshoe.dto;

import lk.ijse.skyshoe.entity.ItemResupply;
import lk.ijse.skyshoe.entity.ItemSale;
import lk.ijse.skyshoe.entity.Stock;
import lk.ijse.skyshoe.entity.Suppliers;
import lk.ijse.skyshoe.entity.enums.ItemCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItemDTO {
    private String itemCode;
    private String description;
    private String category;
    private double priceBuy;
    private double priceSell;
    private String itemImg;
   private Suppliers suppliers;

}
