package com.wellsfargo.loanapp.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.wellsfargo.loanapp.dto.EmployeeDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

  @JsonProperty("access_token")
  private String accessToken;
  @JsonProperty("refresh_token")
  private String refreshToken;
  private EmployeeDTO employee;
}
