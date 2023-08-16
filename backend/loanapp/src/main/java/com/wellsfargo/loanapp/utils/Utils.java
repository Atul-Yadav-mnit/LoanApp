package com.wellsfargo.loanapp.utils;

import java.util.UUID;

public class Utils {

	public static String generateUniqueId() {
		String uuid = UUID.randomUUID().toString().replace("-", "");
		return uuid.substring(0,6);
	}
}
