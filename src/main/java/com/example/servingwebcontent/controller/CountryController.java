package com.example.servingwebcontent.controller;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;

import com.example.servingwebcontent.entity.CountryEntity;
import com.example.servingwebcontent.form.CountryAddForm;
import com.example.servingwebcontent.form.CountrySearchForm;
import com.example.servingwebcontent.form.TestForm;
import com.example.servingwebcontent.repository.CountryEntityMapper;
import com.google.gson.Gson;

@Controller
public class CountryController {

	@Autowired
	private CountryEntityMapper mapper;

	/**
	 * The String class represents character strings.
	 */
	@GetMapping("/list")
	public String list(TestForm testForm) {
		// String names = "countrys";
		// List<CountryEntity> list = mapper.select(SelectDSLCompleter.allRows());
		// model.addAttribute(names, list);
		// model.addAttribute("testForm", new TestForm());
		return "list";
	}

	// 初期化
	@GetMapping("/country")
	public String init(CountrySearchForm countrySearchForm) {
		return "country/country";
	}

	//検索
	@PostMapping("/country/getCountry")
	@ResponseBody
	public String getCountry(@Validated CountrySearchForm countrySearchForm, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
		}

		Optional<CountryEntity> countryEntity = mapper.selectByPrimaryKey(countrySearchForm.getMstCountryCD());
		if (countryEntity == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Country存在しない");
		}

		return new Gson().toJson(countryEntity.get());
	}

	// 更新
	@PostMapping("/country/updateCountry")
	@ResponseBody
	public String updateCountry(@Validated CountryAddForm countryAddForm, BindingResult bindingResult, Model model) {
		if (bindingResult.hasErrors()) {
			String err = bindingResult.getAllErrors().stream().map(ObjectError::getDefaultMessage)
					.collect(Collectors.joining("\r\n"));
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, err);
		}

		// 更新
		CountryEntity countryEntity = new CountryEntity();
		countryEntity.setMstcountrycd(countryAddForm.getCountryid());
		countryEntity.setMstcountrynanme(countryAddForm.getCountrynanme());
		mapper.updateByPrimaryKey(countryEntity);

		return new Gson().toJson("success");
	}

	// 新規
	@PostMapping("/country/addCountry")
	@ResponseBody
	public String addCountry(@Validated CountryAddForm countryAddForm, BindingResult bindingResult, Model model) {
		if (bindingResult.hasErrors()) {
			String err = bindingResult.getAllErrors().stream().map(ObjectError::getDefaultMessage)
					.collect(Collectors.joining("\r\n"));
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, err);
		}

		// 存在チェック
		Optional<CountryEntity> customerEntity = mapper.selectByPrimaryKey(countryAddForm.getCountryid());
		if (customerEntity.isPresent()) {
			throw new ResponseStatusException(HttpStatus.FOUND, "Country存在");
		}
		// 登録
		CountryEntity countryEntity = new CountryEntity();
		countryEntity.setMstcountrycd(countryAddForm.getCountryid());
		countryEntity.setMstcountrynanme(countryAddForm.getCountrynanme());
		mapper.insert(countryEntity);

		return new Gson().toJson("success");
	}

	//削除
	@PostMapping("/country/delete")
	@ResponseBody
	public String delete(@Validated CountryAddForm countryAddForm, BindingResult bindingResult, Model model) {
		if (bindingResult.hasErrors()) {
			String err = bindingResult.getAllErrors().stream().map(ObjectError::getDefaultMessage)
					.collect(Collectors.joining("\r\n"));
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, err);
		}
		// 削除
		mapper.deleteByPrimaryKey(countryAddForm.getCountryid());

		return new Gson().toJson("success");
	}
}
