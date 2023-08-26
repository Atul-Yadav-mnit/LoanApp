package com.wellsfargo.loanapp.config;

import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(SecurityAutoConfiguration.class)
public class TestSecurityConfiguration {
}
