package com.wellsfargo.loanapp.utils;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

public class Utils {

	public static String generateUniqueId() {
		String uuid = UUID.randomUUID().toString().replace("-", "");
		return uuid.substring(0,6);
	}

	public static Date addYearsToDate(Date date, int yearsToAdd) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.YEAR, yearsToAdd);
		return calendar.getTime();
	}
}
