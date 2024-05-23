package lk.ijse.skyshoe.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.skyshoe.dto.StockDTO;
import lk.ijse.skyshoe.entity.Customer;
import lk.ijse.skyshoe.entity.Item;
import lk.ijse.skyshoe.entity.Stock;
import lk.ijse.skyshoe.repo.ItemRepo;
import lk.ijse.skyshoe.repo.StockRepo;
import lk.ijse.skyshoe.service.StockService;
import lk.ijse.skyshoe.util.VarList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public String update(StockDTO dto) {
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
    public String delete(String id) {
        return null;
    }
}
