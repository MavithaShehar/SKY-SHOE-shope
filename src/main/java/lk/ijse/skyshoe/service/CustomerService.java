package lk.ijse.skyshoe.service;

import lk.ijse.skyshoe.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {
    String saveCustomer(CustomerDTO customerDTO);
    String updateCustomer(CustomerDTO customerDTO);
    CustomerDTO getSelectedCustomer(String customerId);
    List<CustomerDTO> getAllCustomers();
    String deleteCustomer(String customerId);
}
