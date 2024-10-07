package lk.ijse.skyshoe.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.skyshoe.dto.CustomerDTO;
import lk.ijse.skyshoe.dto.SuppliersDTO;
import lk.ijse.skyshoe.entity.Customer;
import lk.ijse.skyshoe.entity.Suppliers;
import lk.ijse.skyshoe.repo.CustomerRepo;
import lk.ijse.skyshoe.repo.SuppliersRepo;
import lk.ijse.skyshoe.service.SuppliersService;
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
public class SuppliersServiceIMPL implements SuppliersService {

    private final SuppliersRepo suppliersRepo;
    private final ModelMapper modelMapper;

    @Override
    public String save(SuppliersDTO suppliersDTO) {
        if (suppliersRepo.existsById(suppliersDTO.getSupplierId())){
            return VarList.RSP_DUPLICATED;
        }else {
            suppliersRepo.save(modelMapper.map(suppliersDTO, Suppliers.class));
            return VarList.RSP_SUCCESS;
        }

    }

    @Override
    public String update(SuppliersDTO suppliersDTO) {
        if (suppliersRepo.existsById(suppliersDTO.getSupplierId())){
            suppliersRepo.save(modelMapper.map(suppliersDTO, Suppliers.class));
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }

    }

    @Override
    public SuppliersDTO getSelected(String supId) {
        if (suppliersRepo.existsById(supId)){
            Suppliers suppliers = suppliersRepo.findById(supId).orElse(null);
            return modelMapper.map(suppliers,SuppliersDTO.class);
        }else {
            return null;
        }
    }

    @Override
    public List<SuppliersDTO> getAll() {
        List<Suppliers> suppliersList = suppliersRepo.findAll();
        return modelMapper.map(suppliersList,new TypeToken<ArrayList<SuppliersDTO>>(){}.getType());

    }

    @Override
    public String delete(String supId) {

        if (suppliersRepo.existsById(supId)){
            suppliersRepo.deleteById(supId);
            return VarList.RSP_SUCCESS;

        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }

    }
}
