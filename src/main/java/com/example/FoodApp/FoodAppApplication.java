package com.example.FoodApp;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.VendorExtension;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class FoodAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodAppApplication.class, args);
	}

	List<VendorExtension> vendorExtensions = new ArrayList<VendorExtension>();
	Contact contact = new Contact("team-1", "https://abc.com", "team1@clarivate.com");
	
	//Parameters:					1.title 		2.description 					3.version 		4.termsOfServiceUrl			5.contact 	6.license  7.license_url 8.vendorExtensions
	ApiInfo apiInfo = new ApiInfo("Food-app", "Online food ordering system", "snapshot-0.01", "https://foodApp.com", contact,  "www.example.com","terms & conditions", vendorExtensions);

	@Bean
	public Docket myDocket() {
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.example.FoodApp"))
				.build()
				.apiInfo(apiInfo);
	}
}
