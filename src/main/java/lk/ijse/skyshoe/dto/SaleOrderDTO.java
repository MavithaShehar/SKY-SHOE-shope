package lk.ijse.skyshoe.dto;

import lk.ijse.skyshoe.entity.Customer;
import lk.ijse.skyshoe.entity.Employee;
import lk.ijse.skyshoe.entity.Sale;
import lk.ijse.skyshoe.entity.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SaleOrderDTO {
    private Sale orderId;
    private Date orderItemDate;
    private int orderItemQty;
    private PaymentMethod paymentOption;
    private int points;
    private double totalPrice;
    private Customer customerId;
    private Employee employeeId;


    private List<ItemDataDTO> itemData;


}
