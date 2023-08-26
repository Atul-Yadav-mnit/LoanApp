package com.wellsfargo.loanapp.auth;

import com.wellsfargo.loanapp.dto.EmployeeDTO;
import com.wellsfargo.loanapp.model.LoginModel;
import com.wellsfargo.loanapp.service.ResponseGenerator;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class AuthenticationController {

  @Autowired
  private AuthenticationService service;

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(
          @RequestBody EmployeeDTO employeeDto
  ) {
    AuthenticationResponse response = service.register(employeeDto);
    return ResponseGenerator.generateResponse(HttpStatus.OK, "Employee added successfully !!!",response);
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody LoginModel loginModel
  ) {
    AuthenticationResponse response = service.authenticate(loginModel);
    return ResponseGenerator.generateResponse(HttpStatus.OK, "Employee authenticated successfully !!!",response);
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }


}
