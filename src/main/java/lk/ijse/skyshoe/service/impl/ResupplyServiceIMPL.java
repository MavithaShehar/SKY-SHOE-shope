package lk.ijse.skyshoe.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.skyshoe.dto.ResupplyDTO;
import lk.ijse.skyshoe.entity.Customer;
import lk.ijse.skyshoe.entity.Resupply;
import lk.ijse.skyshoe.repo.ResuplyRepo;
import lk.ijse.skyshoe.service.ResuplyService;
import lk.ijse.skyshoe.util.VarList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor

public class ResupplyServiceIMPL implements ResuplyService {

   private final ResuplyRepo resuplyRepo;
   private final ModelMapper modelMapper;


    @Override
    public String save(ResupplyDTO resupplyDTO) {

        System.out.println("i am hear ResupplyServiceIMPL");

        UUID uuid = UUID.randomUUID();
        String uuidString = uuid.toString();
        String re_sup_Id = uuidString.substring(0, Math.min(uuidString.length(), 5));
        resupplyDTO.setResupplyId(re_sup_Id);

        if (resuplyRepo.existsById(resupplyDTO.getResupplyId())){
            return VarList.RSP_DUPLICATED;
        }else {
              resuplyRepo.save(modelMapper.map(resupplyDTO, Resupply.class));
            return VarList.RSP_SUCCESS;
        }
    }

    @Override
    public String update(ResupplyDTO dto) {
        return null;
    }

    @Override
    public ResupplyDTO getSelected(String id) {
        return null;
    }

    @Override
    public List<ResupplyDTO> getAll() {
        return null;
    }

    @Override
    public String delete(String id) {
        return null;
    }
}
