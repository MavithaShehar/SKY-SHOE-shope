package lk.ijse.skyshoe.service;

import lk.ijse.skyshoe.reqAndResp.response.JWTAuthResponse;
import lk.ijse.skyshoe.reqAndResp.secure.SignIn;
import lk.ijse.skyshoe.reqAndResp.secure.SignUp;

public interface AuthenticationService {
    JWTAuthResponse signIn(SignIn signIn);
    JWTAuthResponse signUp(SignUp signUp);
    JWTAuthResponse refreshToken(String accessToken);


}
