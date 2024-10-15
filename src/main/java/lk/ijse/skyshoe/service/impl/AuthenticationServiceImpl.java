package lk.ijse.skyshoe.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.skyshoe.entity.Employee;
import lk.ijse.skyshoe.exception.UsernameNotFoundException;
import lk.ijse.skyshoe.repo.EmployeeRepo;
import lk.ijse.skyshoe.reqAndResp.response.JWTAuthResponse;
import lk.ijse.skyshoe.reqAndResp.secure.SignIn;
import lk.ijse.skyshoe.reqAndResp.secure.SignUp;
import lk.ijse.skyshoe.service.AuthenticationService;
import lk.ijse.skyshoe.service.JWTService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    private final EmployeeRepo employeeRepo;
    private final JWTService jwtService;

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public JWTAuthResponse signIn(SignIn signIn) {
        try {
            log.info("Sign in");
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signIn.getEmail(), signIn.getPassword())
            );
        } catch (AuthenticationException e) {
            e.printStackTrace();
            // Handle authentication failure
            System.out.println("Authentication failed: " + e.getMessage());
            throw new BadCredentialsException("Invalid email/password");
        }


        Employee employee = employeeRepo.findByEmail(signIn.getEmail())
                .orElseThrow(
                        () -> new UsernameNotFoundException("User Not Found")
                );

        String token = jwtService.generateToken(employee);

        return new JWTAuthResponse(token);

    }

    @Override
    public JWTAuthResponse signUp(SignUp signUp) {
        log.info("Sign uo");
        Employee employee = employeeRepo.findByEmail(signUp.getEmail())
                .orElseThrow(
                        () -> new UsernameNotFoundException("User Not Found")
                );

        if (employee != null) {
            employee.setPassword(passwordEncoder.encode(signUp.getPassword()));
            employeeRepo.save(employee);

            String token = jwtService.generateToken(employee);
            return new JWTAuthResponse(token);

        } else {
            throw new UsernameNotFoundException("User Not Found");

        }

    }

    @Override
    public JWTAuthResponse refreshToken(String accessToken) {
        log.info("token refreshed");
        String userName = jwtService.extractUserName(accessToken);

        Employee employee = employeeRepo.findByEmail(userName).orElseThrow(
                () -> new UsernameNotFoundException("User Not Found")
        );

        String token = jwtService.generateToken(employee);
        return new JWTAuthResponse(token);

    }
}
