package com.example.servingwebcontent.form;

import lombok.Data;

@Data
public class ProvForm {

	private String mstcountrycd;

	private String provcode;

	private String provname;

	public ProvForm() {
	}

	public ProvForm(String mstcountrycd, String provcode, String provname) {
		this.mstcountrycd = mstcountrycd;

		this.provcode = provcode;

		this.provname = provname;
	}
}