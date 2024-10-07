package lk.ijse.skyshoe.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.skyshoe.dto.CustomerDTO;
import lk.ijse.skyshoe.dto.ItemDTO;
import lk.ijse.skyshoe.entity.Customer;
import lk.ijse.skyshoe.entity.Employee;
import lk.ijse.skyshoe.entity.Item;
import lk.ijse.skyshoe.repo.CustomerRepo;
import lk.ijse.skyshoe.repo.ItemRepo;
import lk.ijse.skyshoe.service.ItemService;
import lk.ijse.skyshoe.util.VarList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor

public class ItemServiceIMPL implements ItemService {

    private final ItemRepo itemRepo;
    private final ModelMapper modelMapper;

    @Override
    public String save(ItemDTO itemDTO) {
        if (itemRepo.existsById(itemDTO.getItemCode())){
            return VarList.RSP_DUPLICATED;
        }else {
//            UUID uuid = UUID.randomUUID();
//            String uuidString = uuid.toString();
//            String newItemId = uuidString.substring(0, Math.min(uuidString.length(), 5));
//            itemDTO.setItemCode(newItemId);
//            itemRepo.save(modelMapper.map(itemDTO, Item.class));
//            return VarList.RSP_SUCCESS;


            Item item = new Item(
                    itemDTO.getItemCode(),
                    itemDTO.getDescription(),
                    itemDTO.getCategory(),
                    itemDTO.getPriceBuy(),
                    itemDTO.getPriceSell(),
                    itemDTO.getItemImg(),
                    itemDTO.getSuppliers(),
                    null,
                    null,
                    null
            );
         //   System.out.println("itm entity : "+item);
//        itemRepo.save(modelMapper.map(itemDTO,Item.class));
            itemRepo.save(item);

            return VarList.RSP_SUCCESS;
        }
    }

    @Override
    public String update(ItemDTO itemDTO) {
        if (itemRepo.existsById(itemDTO.getItemCode())){
            itemRepo.save(modelMapper.map(itemDTO, Item.class));
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }

    @Override
    public ItemDTO getSelected(String itemId) {
        if (itemRepo.existsById(itemId)){
            Item item = itemRepo.findById(itemId).orElse(null);
            return modelMapper.map(item, ItemDTO.class);
        }else {
            return null;
        }
    }

    @Override
    public List<ItemDTO> getAll() {


        List<Item> itemList = itemRepo.findAll();
        return modelMapper.map(itemList,new TypeToken<ArrayList<ItemDTO>>(){}.getType());

    }

    @Override
    public String delete(String itemId) {
        if (itemRepo.existsById(itemId)){
            itemRepo.deleteById(itemId);
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
}
