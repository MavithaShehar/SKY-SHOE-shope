package lk.ijse.skyshoe.service;

import lk.ijse.skyshoe.dto.StockDTO;
import lk.ijse.skyshoe.dto.getStockDTO;

import java.util.List;

public interface StockService extends CrudService<StockDTO,String> {

    public List<getStockDTO> getAllData() ;
}
