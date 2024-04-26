package lk.ijse.skyshoe.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.skyshoe.dto.CustomerDTO;
import lk.ijse.skyshoe.entity.Customer;
import lk.ijse.skyshoe.repo.CustomerRepo;
import lk.ijse.skyshoe.service.CustomerService;
import lk.ijse.skyshoe.util.VarList;
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

public class customerServiceIMPL implements CustomerService {
    private final CustomerRepo customerRepo;
    private final ModelMapper modelMapper;

    @Override
    public String save(CustomerDTO customerDTO) {
        if (customerRepo.existsById(customerDTO.getCustomerId())){
            return VarList.RSP_DUPLICATED;
        }else {
            UUID uuid = UUID.randomUUID();
            String uuidString = uuid.toString();
            String newCustomerId = uuidString.substring(0, Math.min(uuidString.length(), 5));
            customerDTO.setCustomerId(newCustomerId);
            customerRepo.save(modelMapper.map(customerDTO, Customer.class));
            return VarList.RSP_SUCCESS;
        }

    }

    @Override
    public String update(CustomerDTO customerDTO) {
        if (customerRepo.existsById(customerDTO.getCustomerId())){
            System.out.println("////////////////"+customerDTO);
            customerRepo.save(modelMapper.map(customerDTO, Customer.class));
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }

    }

    @Override
    public CustomerDTO getSelected(String custId) {
        if (customerRepo.existsById(custId)){
            Customer customer = customerRepo.findById(custId).orElse(null);
            return modelMapper.map(customer,CustomerDTO.class);
        }else {
            return null;
        }
    }

    @Override
    public List<CustomerDTO> getAll() {
        List<Customer> customerLIst = customerRepo.findAll();
        return modelMapper.map(customerLIst,new TypeToken<ArrayList<CustomerDTO>>(){}.getType());

    }

    @Override
    public String delete(String custId) {
        if (customerRepo.existsById(custId)){
            customerRepo.deleteById(custId);
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
}