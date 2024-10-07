package lk.ijse.skyshoe.dto;

import lk.ijse.skyshoe.entity.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class getItemSaleDTO {

    private String orderId;
    private String itemQty;
    private double totalPrice;
    private Date date;
    private PaymentMethod paymentMethod;
    private int points;
    private String customer;
    private String employee;
    private List<ItemSaleDTO> itemSaleList;

}
