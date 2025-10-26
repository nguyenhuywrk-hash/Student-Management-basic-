package com.hoanghuy.studentmanagement.controller;

import com.hoanghuy.studentmanagement.dto.StudentDTO;
import com.hoanghuy.studentmanagement.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/student")
public class StudentController {
    private final StudentService studentService;

    @PostMapping
    public ResponseEntity<StudentDTO> createStudent(@RequestBody StudentDTO studentDTO) {
        return new ResponseEntity<>(studentService.createNewStudent(studentDTO), HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<Page<StudentDTO>> getAllStudents(@RequestParam(value = "page", defaultValue = "0") int page,
                                                           @RequestParam(value = "limit", defaultValue = "5") int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        return new ResponseEntity<>(studentService.getAllStudents(pageable), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
        return new ResponseEntity<>(studentService.getStudentById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> updateStudentById(@PathVariable Long id,
                                                        @RequestBody StudentDTO studentDTO) {
        return new ResponseEntity<>(studentService.updateStudent(id, studentDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudentById(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return new ResponseEntity<>( HttpStatus.NO_CONTENT);
    }
}
