import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import { Alert } from "bootstrap";

function Management() {
    const [students, setStudents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [addNew, setAddNew] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/v1/student?page=${currentPage - 1}`)
            .then((res) => {
                setStudents(res.data.content);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => console.error(err));
    }, [currentPage]);

    const handleAdd = () => {
        setAddNew(true);
        setShowForm(true);
        setCurrentStudent({
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            gender: 0,
            email: "",
            phoneNumber: "",
            address: "",
        });
    };


    const handleEdit = (student) => {
        setCurrentStudent(student);
        setShowForm(true);
        setAddNew(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentStudent({ ...currentStudent, [name]: value });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        //scroll mượt hơn
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const formatDateForBackend = (dateString) => {
        if (!dateString) return "";
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`; // đổi yyyy-MM-dd → dd-MM-yyyy
    };

    const handleSave = () => {
        const formattedStudent = {
            ...currentStudent,
            dateOfBirth: formatDateForBackend(currentStudent.dateOfBirth),
        };

        if (addNew) {
            // Thêm mới sinh viên
            axios
                .post(`http://localhost:8080/api/v1/student`, formattedStudent)
                .then((res) => {
                    setStudents([...students, res.data]); // cập nhật lai danh sách
                    Alert("Thêm mới sinh viên thành công!");
                })
                .catch((err) => console.error(err));
        } else {
            // Cập nhật sinh viên
            axios
                .put(`http://localhost:8080/api/v1/student/${currentStudent.id}`, formattedStudent)
                .then((res) => {
                    setStudents(students.map((student) => (student.id === currentStudent.id ? res.data : student)));
                })
                .catch((err) => console.error(err));
        }

        // Đóng form & reset state
        setShowForm(false);
        setCurrentStudent(null);
        setAddNew(false);
    };

    const handleDelete = (student) => {
        if (window.confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
            setStudents(students.filter((s) => s.id !== student.id));
            axios
                .delete(`http://localhost:8080/api/v1/student/${student.id}`)
                .then((res) => {
                    // console.log("Delete successful:", res.data);
                })
                .catch((err) => console.error(err));
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setCurrentStudent(null);
    };

    return (
        <div className="py-4 px-3">
            <div className="table-container bg-white p-4 rounded shadow-sm">
                <div className="table-header d-flex justify-content-between align-items-center">
                    <h3 className="table-title fw-bolder mb-4"><i className="fa-solid fa-rectangle-list"></i>List of student</h3>
                    <button className="btn btn-sm btn-success mb-4 p-2 fw-bolder" onClick={handleAdd}>
                        <i className="fa-solid fa-plus me-2"></i>
                        New
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle text-center">
                        <thead className="table-primary">
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-start">
                            {students.map((student, index) => (
                                <tr key={student.id}>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.dateOfBirth}</td>
                                    <td>
                                        {student.gender === 1 ? 'Female' : 'Male'}
                                    </td>
                                    <td>{student.email}</td>
                                    <td>{student.phoneNumber}</td>
                                    <td>{student.address}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => handleEdit(student)}
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(student)}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="table-pagination">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>

            {/* Edit Form Modal */}
            {showForm && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                {addNew ? (
                                    <h5 className="modal-title">Add New Student</h5>
                                ) : (
                                    <h5 className="modal-title">Update Student</h5>
                                )}
                                <button type="button" className="btn-close" onClick={handleCancel}></button>
                            </div>
                            <div className="modal-body">
                                {currentStudent && (
                                    <form>
                                        <div className="mb-2">
                                            <label className="form-label">First Name</label>
                                            <input type="text" className="form-control" name="firstName" value={currentStudent.firstName} onChange={handleChange} />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Last Name</label>
                                            <input type="text" className="form-control" name="lastName" value={currentStudent.lastName} onChange={handleChange} />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Date of Birth</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="dateOfBirth"
                                                value={currentStudent.dateOfBirth ? currentStudent.dateOfBirth.split("T")[0] : ""}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mb-2">
                                            <label className="form-label d-block">Gender</label>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gender"
                                                    id="male"
                                                    value="0"
                                                    checked={currentStudent.gender === 0}
                                                    onChange={(e) => setCurrentStudent({ ...currentStudent, gender: parseInt(e.target.value) })}
                                                />
                                                <label className="form-check-label" htmlFor="male">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gender"
                                                    id="female"
                                                    value="1"
                                                    checked={currentStudent.gender === 1}
                                                    onChange={(e) => setCurrentStudent({ ...currentStudent, gender: parseInt(e.target.value) })}
                                                />
                                                <label className="form-check-label" htmlFor="female">Female</label>
                                            </div>
                                        </div>

                                        <div className="mb-2">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control" name="email" value={currentStudent.email} onChange={handleChange} />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Phone</label>
                                            <input type="text" className="form-control" name="phoneNumber" value={currentStudent.phoneNumber} onChange={handleChange} />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Address</label>
                                            <input type="text" className="form-control" name="address" value={currentStudent.address} onChange={handleChange} />
                                        </div>
                                    </form>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleSave}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Management;
