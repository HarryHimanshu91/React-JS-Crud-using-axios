import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Student extends Component {

    state = {
        students: [],
        loading: true,
    }

    async componentDidMount() {
        const res = await axios.get("http://127.0.0.1:8000/api/students");
        // console.log(res.data);

        if (res.data.status === 200) {
            this.setState({
                students: res.data.students,
                loading: false
            });
            // console.log(this.state.students)
        }
    }

    deleteStudent = async (e, id) => {
        //  alert(id)

        const clickedDeleteBtn = e.currentTarget;
        clickedDeleteBtn.innerText = "Deleting";

        const res = await axios.delete(`http://127.0.0.1:8000/api/delete-student/${id}`);

        if (res.data.status === 200) {
            clickedDeleteBtn.closest("tr").remove();
            // console.log(res.data.message);
            swal({
                title: "Deleted !",
                text: res.data.message,
                icon: "success",
                button: "OK!",
            });
        }
    }

    render() {

        var student_HTMLTABLE = "";

        if (this.state.loading) {

            student_HTMLTABLE = <tr colSpan="7"><td><h2>Loading</h2></td></tr>;
        }
        else {
            student_HTMLTABLE =
                this.state.students.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.course}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                          
                            <td>
                                <Link to={`edit-student/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                            </td>
                            <td>
                                <button onClick={(e) => { if (window.confirm('Delete the item?')) { this.deleteStudent(e, item.id) }; }} type="button"
                                    className="btn btn-danger btn-sm" >Delete</button>
                            </td>

                        </tr>
                    );
                });
        }

        return (
            <div className="container">
                <div className="row">
                    
                    <div className="col-md-12 py-3">
                      <h2 style={{color: "green", textAlign:"center"}} > Laravel React JS CRUD without IMAGE  using Class Component </h2>
                     <h2 style={{color: "red", textAlign:"center"}} > Using Axios Method </h2>
                    </div>

                      <div className="col-md-12">
                        <div className="card">
                       
                            <div className="card-header">
                                <h4> Student Data
                                    <Link to={"add-student"} className="btn btn-primary btn-sm float-end"> Add Student </Link>
                                </h4>
                            </div>

                            <div className="card-body">

                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th> ID </th>
                                            <th> Name </th>
                                            <th> Course </th>
                                            <th> Email </th>
                                            <th> Phone </th>
                                        
                                            <th>Edit </th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student_HTMLTABLE}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Student;