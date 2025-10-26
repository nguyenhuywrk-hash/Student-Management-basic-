package com.hoanghuy.studentmanagement.repository;

import com.hoanghuy.studentmanagement.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
//  View
    Page<Student> findByFirstName(String firstName, Pageable pageable);
    Page<Student> findByLastName(String lastName, Pageable pageable);
    Page<Student> findById(Long id, Pageable pageable);
    Page<Student> findAll(Pageable pageable);
}
