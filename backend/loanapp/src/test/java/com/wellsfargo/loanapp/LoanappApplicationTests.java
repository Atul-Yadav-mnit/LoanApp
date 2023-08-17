package com.wellsfargo.loanapp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages="com")
@SpringBootTest(classes=com.wellsfargo.loanapp.ApplyLoanTest.class)
class LoanappApplicationTests {

	@Test
	void contextLoads() {
	}

}
