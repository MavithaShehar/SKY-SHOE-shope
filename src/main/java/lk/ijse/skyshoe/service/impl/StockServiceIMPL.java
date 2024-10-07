package lk.ijse.skyshoe.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.skyshoe.dto.ItemDTO;
import lk.ijse.skyshoe.dto.StockDTO;
import lk.ijse.skyshoe.dto.getStockDTO;
import lk.ijse.skyshoe.entity.Customer;
import lk.ijse.skyshoe.entity.Item;
import lk.ijse.skyshoe.entity.Stock;
import lk.ijse.skyshoe.repo.ItemRepo;
import lk.ijse.skyshoe.repo.StockRepo;
import lk.ijse.skyshoe.service.StockService;
import lk.ijse.skyshoe.util.VarList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor

public class StockServiceIMPL implements StockService {

    private final ItemRepo itemRepo;
    private final StockRepo stockRepo;
    private final ModelMapper modelMapper;

    @Override
    public String save(StockDTO stockDTO) {
         Stock stockPrint = stockRepo.findByColourSizeAndItemCode(stockDTO.getColour(),stockDTO.getSize(),stockDTO.getItem().getItemCode());

        if (itemRepo.existsById(stockDTO.getItem().getItemCode())) {

            Stock stock = new Stock(
                    stockDTO.getSize(),
                    stockDTO.getQty(),
                    stockDTO.getMaxQty(),
                    stockDTO.getColour(),
                    stockDTO.getStatus(),
                    stockDTO.getItem(),
                    stockDTO.getItemImage()

            );
            System.out.println("Inventory id is hear ");
            stockRepo.save(stock);
            return VarList.RSP_SUCCESS;

        } else {
            System.out.println("Inventory id is not hear ");

        }
        return null;
    }

    @Override
    public String update(StockDTO stockDTO) {

        Stock stockPrint = stockRepo.findByColourSizeAndItemCode(stockDTO.getColour(),stockDTO.getSize(),stockDTO.getItem().getItemCode());

        if (itemRepo.existsById(stockDTO.getItem().getItemCode())) {

            Stock stock = new Stock(
                    stockDTO.getSize(),
                    stockDTO.getQty(),
                    stockDTO.getMaxQty(),
                    stockDTO.getColour(),
                    stockDTO.getStatus(),
                    stockDTO.getItem(),
                    stockDTO.getItemImage()

            );
            System.out.println("Inventory id is hear ");
            stockRepo.save(stock);
            return VarList.RSP_SUCCESS;

        } else {
            System.out.println("Inventory id is not hear ");

        }
        return null;
    }



    @Override
    public StockDTO getSelected(String id) {
        return null;
    }

    @Override
    public List<StockDTO> getAll() {
        return null;
    }

    @Override
    public List<getStockDTO> getAllData() {
        List<Stock> stockList = stockRepo.findAll();
        List<getStockDTO> stockDTOList = new ArrayList<>();

        // Manually filter and map each Stock entity to StockDTO inside the for-each loop
        for (Stock stock : stockList) {
            // Retrieve the associated Item entity
            Item item = stock.getItem();

            // Map the Stock entity and Item entity fields to StockDTO
            getStockDTO getStockDTO = new getStockDTO(
                    stock.getSize(),
                    stock.getQty(),
                    stock.getMaxQty(),
                    stock.getColour(),
                    stock.getStatus(),
                    item.getItemCode(), // Field from Item entity
                    item.getDescription(), // Field from Item entity
                    item.getCategory(), // Field from Item entity
                    item.getPriceBuy(), // Field from Item entity
                    item.getPriceSell(), // Field from Item entity
                    stock.getItemImage() // Field from Stock entity
            );

            // Add the mapped StockDTO to the list
            stockDTOList.add(getStockDTO);
        }

        return stockDTOList;
    }



    @Override
    public String delete(String id) {
        return null;
    }
}
