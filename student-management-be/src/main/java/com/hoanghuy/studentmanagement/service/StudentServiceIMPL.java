package com.hoanghuy.studentmanagement.service;

import com.hoanghuy.studentmanagement.dto.StudentDTO;
import com.hoanghuy.studentmanagement.entity.Student;
import com.hoanghuy.studentmanagement.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentServiceIMPL implements StudentService {
    private final StudentRepository studentRepository;
    private final ModelMapper modelMapper;

    @Override
    public Page<StudentDTO> getAllStudents(Pageable pageable) {
        Page<Student> students = studentRepository.findAll(pageable);
        return students.map(student ->  modelMapper.map(student, StudentDTO.class));
    }

    @Override
    public Page<StudentDTO> getStudentsByLastName(String lastName, Pageable pageable) {
        return null;
    }

    @Override
    public Page<StudentDTO> getStudentsByFirstName(String firstName, Pageable pageable) {
        return null;
    }

    @Override
    public Page<StudentDTO> getStudentsByEmail(String email, Pageable pageable) {
        return null;
    }

    @Override
    public StudentDTO getStudentById(Long id) {
        Student  student = studentRepository.findById(id).orElse(null);
        return modelMapper.map(student, StudentDTO.class);
    }

    @Override
    public StudentDTO createNewStudent(StudentDTO studentDTO) {
        Student student = studentRepository.save(modelMapper.map(studentDTO, Student.class));
        return modelMapper.map(student, StudentDTO.class);
    }

    @Override
    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        student.setFirstName(studentDTO.getFirstName());
        student.setLastName(studentDTO.getLastName());
        student.setAddress(studentDTO.getAddress());
        student.setEmail(studentDTO.getEmail());
        student.setGender(studentDTO.getGender());
        student.setPhoneNumber(studentDTO.getPhoneNumber());
        student.setDateOfBirth(studentDTO.getDateOfBirth());

        return modelMapper.map(studentRepository.save(student), StudentDTO.class);
    }

    @Override
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        studentRepository.delete(student);
    }
}
