package lk.ijse.skyshoe.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.skyshoe.dto.EmployeeDTO;
import lk.ijse.skyshoe.entity.Employee;
import lk.ijse.skyshoe.repo.EmployeeRepo;
import lk.ijse.skyshoe.service.EmployeeService;
import lk.ijse.skyshoe.util.VarList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor

public class EmployeeServiceIMPL implements EmployeeService {

    private final ModelMapper modelMapper;
    private final EmployeeRepo employeeRepo;

    @Override
    public String save(EmployeeDTO employeeDTO) {

        System.out.println(modelMapper.map(employeeDTO, Employee.class));
        if (employeeRepo.existsById(employeeDTO.getEmployeeId())){
            return VarList.RSP_DUPLICATED;
        }else {
            employeeRepo.save(modelMapper.map(employeeDTO, Employee.class));
            return VarList.RSP_SUCCESS;
        }
    }

    @Override
    public String update(EmployeeDTO employeeDTO) {
        if (employeeRepo.existsById(employeeDTO.getEmployeeId())){
            employeeRepo.save(modelMapper.map(employeeDTO, Employee.class));
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }

    @Override
    public EmployeeDTO getSelected(String empId) {
        if (employeeRepo.existsById(empId)){
            Employee employee = employeeRepo.findById(empId).orElse(null);
            return modelMapper.map(employee, EmployeeDTO.class);
        }else {
            return null;
        }
    }

    @Override
    public List<EmployeeDTO> getAll() {
        List<Employee> employeeList = employeeRepo.findAll();
        return modelMapper.map(employeeList,new TypeToken<ArrayList<EmployeeDTO>>(){}.getType());

    }

    @Override
    public String delete(String empid) {
        if (employeeRepo.existsById(empid)){
            employeeRepo.deleteById(empid);
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }

    @Override
    public EmployeeDTO getSelectEmployee(String email) {

        System.out.println("service i am hear");

        Employee employee = employeeRepo.getSelectEmployee(email);
        System.out.println("service i am hear and "+employee);
            return modelMapper.map(employee, EmployeeDTO.class);

    }
}
