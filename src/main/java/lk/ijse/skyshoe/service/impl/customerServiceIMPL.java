package lk.ijse.skyshoe.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.skyshoe.dto.CustomerDTO;
import lk.ijse.skyshoe.entity.Customer;
import lk.ijse.skyshoe.repo.CustomerRepo;
import lk.ijse.skyshoe.service.CustomerService;
import lk.ijse.skyshoe.util.VarLIst;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor

public class customerServiceIMPL implements CustomerService {
    private final CustomerRepo customerRepo;
    private final ModelMapper modelMapper;

    @Override
    public String saveCustomer(CustomerDTO customerDTO) {
        if (customerRepo.existsById(customerDTO.getCustomerId())){
            return VarLIst.RSP_DUPLICATED;
        }else {
            customerRepo.save(modelMapper.map(customerDTO, Customer.class));
            return VarLIst.RSP_SUCCESS;
        }

    }

    @Override
    public String updateCustomer(CustomerDTO customerDTO) {
        if (customerRepo.existsById(customerDTO.getCustomerId())){
            System.out.println("////////////////"+customerDTO);
            customerRepo.save(modelMapper.map(customerDTO, Customer.class));
            return VarLIst.RSP_SUCCESS;
        }else {
            return VarLIst.RSP_NO_DATA_FOUND;
        }

    }

    @Override
    public CustomerDTO getSelectedCustomer(String custId) {
        if (customerRepo.existsById(custId)){
            Customer customer = customerRepo.findById(custId).orElse(null);
            return modelMapper.map(customer,CustomerDTO.class);
        }else {
            return null;
        }
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        List<Customer> customerLIst = customerRepo.findAll();
        return modelMapper.map(customerLIst,new TypeToken<ArrayList<CustomerDTO>>(){}.getType());

    }

    @Override
    public String deleteCustomer(String custId) {
        if (customerRepo.existsById(custId)){
            customerRepo.deleteById(custId);
            return VarLIst.RSP_SUCCESS;
        }else {
            return VarLIst.RSP_NO_DATA_FOUND;
        }
    }
}
