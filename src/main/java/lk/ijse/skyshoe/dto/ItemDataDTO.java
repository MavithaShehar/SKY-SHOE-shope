package lk.ijse.skyshoe.dto;

import lk.ijse.skyshoe.entity.Item;
import lk.ijse.skyshoe.entity.enums.Colour;
import lk.ijse.skyshoe.entity.enums.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItemDataDTO {

    private String itemSaleId;
    private String itemImg;
    private Item itemCode;
    private Colour colour;
    private int qty;
    private Size size;

}
