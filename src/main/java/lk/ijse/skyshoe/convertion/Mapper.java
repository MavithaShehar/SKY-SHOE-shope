package lk.ijse.skyshoe.convertion;

import lk.ijse.skyshoe.dto.CustomerDTORecode;
import lk.ijse.skyshoe.entity.Customer;

public class Mapper {
    public static Customer toCustomer(CustomerDTORecode customerDTORecode) {
        return new Customer(
                    customerDTORecode.customerId(),
                    customerDTORecode.customerName(),
                    customerDTORecode.gender(),
                    customerDTORecode.joinDate(),
                    customerDTORecode.level(),
                    customerDTORecode.totalPoints(),
                    customerDTORecode.birthday(),
                    customerDTORecode.contactNo(),
                    customerDTORecode.email(),
                    customerDTORecode.addressNoOrName(),
                    customerDTORecode.addressLane(),
                    customerDTORecode.addressCity(),
                    customerDTORecode.addressState(),
                    customerDTORecode.postalCode(),
                    null
            );

    }

    public static CustomerDTORecode toCustomerDTO(Customer customer) {
        return new CustomerDTORecode(
                customer.getCustomerId(),
                customer.getCustomerName(),
                customer.getGender(),
                customer.getJoinDate(),
                customer.getLevel(),
                customer.getTotalPoints(),
                customer.getBirthday(),
                customer.getContactNo(),
                customer.getEmail(),
                customer.getAddressNoOrName(),
                customer.getAddressLane(),
                customer.getAddressCity(),
                customer.getAddressState(),
                customer.getPostalCode()
            );

    }

}
