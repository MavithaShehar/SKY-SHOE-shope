package lk.ijse.skyshoe.reqAndResp.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class JWTAuthResponse {
    @NonNull
    private String token;

}
