package lk.ijse.skyshoe.controller;

import lk.ijse.skyshoe.reqAndResp.response.JWTAuthResponse;
import lk.ijse.skyshoe.reqAndResp.secure.SignIn;
import lk.ijse.skyshoe.reqAndResp.secure.SignUp;
import lk.ijse.skyshoe.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@CrossOrigin
public class UserController {
    @Autowired
    private AuthenticationService authenticationService;

    //sign up
    @PostMapping("/signUp")
    public ResponseEntity<JWTAuthResponse> signUp(@RequestBody SignUp signUp) {
        return ResponseEntity.ok(authenticationService.signUp(signUp));
    }

    //sign in
    @PostMapping("/signIn")
    public ResponseEntity<JWTAuthResponse> signIn(@RequestBody SignIn signIn) {
        return ResponseEntity.ok(authenticationService.signIn(signIn));

    }

    @PostMapping("/refreshToken")
    public ResponseEntity<JWTAuthResponse> refresh(@RequestParam("accessToken") String accessToken) {
        return ResponseEntity.ok(authenticationService.refreshToken(accessToken));

    }

}
