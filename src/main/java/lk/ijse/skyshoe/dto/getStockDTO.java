package lk.ijse.skyshoe.dto;

import lk.ijse.skyshoe.entity.enums.Colour;
import lk.ijse.skyshoe.entity.enums.Size;
import lk.ijse.skyshoe.entity.enums.StockStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class getStockDTO {
    private Size size;
    private int qty;
    private int maxQty;
    private Colour colour;
    private StockStatus status;
    private String itemCode; // Field from Item entity
    private String itemDescription; // Field from Item entity
    private String itemCategory; // Field from Item entity
    private double itemPriceBuy; // Field from Item entity
    private double itemPriceSell; // Field from Item entity
    private String itemImage; // Field from Stock entity
}
