package com.hoanghuy.studentmanagement.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private Long id;
    @NotBlank(message = "First name must not be empty.")
    @Size(max = 50, message = "First name must not exceed 50 characters.")
    private String firstName;

    @NotBlank(message = "Last name must not be empty.")
    @Size(max = 50, message = "Last name must not exceed 50 characters.")
    private String lastName;

    @NotBlank(message = "Email must not be empty.")
    @Email(message = "Please provide a valid email address.")
    private String email;

    @NotBlank(message = "Phone number must not be empty.")
    @Pattern(
            regexp = "^(\\+84|0)[0-9]{9,10}$",
            message = "Phone number must start with +84 or 0 and contain 10–11 digits."
    )
    private String phoneNumber;

    @NotNull(message = "Gender must be specified.")
    @Min(value = 0, message = "Invalid gender value.")
    @Max(value = 1, message = "Invalid gender value.")
    private Byte gender; // 0 = Male, 1 = Female

    @NotBlank(message = "Address must not be empty.")
    @Size(max = 255, message = "Address must not exceed 255 characters.")
    private String address;

    @NotNull(message = "Date of birth must not be empty.")
    @Past(message = "Date of birth must be in the past.")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateOfBirth;
}
