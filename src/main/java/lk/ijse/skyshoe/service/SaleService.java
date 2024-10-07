package lk.ijse.skyshoe.service;

import lk.ijse.skyshoe.dto.OrderDTO;
import lk.ijse.skyshoe.dto.getItemSaleDTO;

import java.util.List;

public interface SaleService extends CrudService<OrderDTO, String>  {
    public List<getItemSaleDTO> getAllOrders();
}
