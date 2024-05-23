package lk.ijse.skyshoe.dto;

import lk.ijse.skyshoe.entity.Item;
import lk.ijse.skyshoe.entity.ItemImage;
import lk.ijse.skyshoe.entity.enums.Colour;
import lk.ijse.skyshoe.entity.enums.Size;
import lk.ijse.skyshoe.entity.enums.StockStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class InventoryDTO {

    private Size size;
    private int qty;
    private int maxQty;
    private Colour colour;
    private StockStatus status;
    private Item item;
    private ItemImage itemImage;

   // private String resupplyId;
    private String date;
    private double totalValue;
    private int totalQty;


}
