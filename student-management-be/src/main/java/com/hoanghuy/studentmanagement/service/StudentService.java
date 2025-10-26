package com.hoanghuy.studentmanagement.service;

import com.hoanghuy.studentmanagement.dto.StudentDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudentService {
    Page<StudentDTO> getAllStudents(Pageable pageable);
    Page<StudentDTO> getStudentsByLastName(String lastName, Pageable pageable);
    Page<StudentDTO> getStudentsByFirstName(String firstName, Pageable pageable);
    Page<StudentDTO> getStudentsByEmail(String email, Pageable pageable);
    StudentDTO getStudentById(Long id);

    StudentDTO createNewStudent(StudentDTO studentDTO);
    StudentDTO updateStudent(Long id, StudentDTO studentDTO);
    void deleteStudent(Long id);
}
