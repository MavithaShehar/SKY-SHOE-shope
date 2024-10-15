package lk.ijse.skyshoe.dto;

import lk.ijse.skyshoe.entity.Refund;
import lk.ijse.skyshoe.entity.Sale;
import lk.ijse.skyshoe.entity.enums.Colour;
import lk.ijse.skyshoe.entity.enums.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItemSaleDTO {
    private String itemSaleId;

    private Sale sale;
    private ItemDTO item;
    private List<Refund> refundList;


    private Size size;

    private Colour colour;

    private int qty;

    private String itemImg;

}
