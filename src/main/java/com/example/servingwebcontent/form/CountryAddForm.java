package com.example.servingwebcontent.form;

import org.checkerframework.checker.index.qual.LengthOf;
import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CountryAddForm {
	@NotBlank(message = "mstcountrycd should not be blank")
	private String countryid;
	@LengthOf("20")
	private String countrynanme;

	public CountryAddForm() {
	}

	public CountryAddForm(String countryid, String countrynanme) {
		this.countryid = countryid;
		this.countrynanme = countrynanme;

	}
}