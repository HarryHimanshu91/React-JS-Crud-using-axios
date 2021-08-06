import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


class AddStudent extends Component {

    state = {
        name: '',
        course: '',
        email: '',
        phone: '',
        error_list: [],
        // file_path:null,
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // On file select
    // onFileChange = event => { 
    //     // Update the state 
    //     this.setState({ file_path: event.target.files[0] }); 
    // }; 

    saveStudent = async (e) => {
        e.preventDefault();
        // console.warn(this.state)  // getting data from form send

       // const formData = new FormData(); 
       
        // Update the formData object 
        //   formData.append("name", this.state.name);
        //   formData.append("course", this.state.course);
        //   formData.append("email", this.state.email);
        //   formData.append("phone", this.state.phone);
        //   formData.append("file_path", this.state.file_path);
         
        // const res = await axios.post("http://127.0.0.1:8000/api/add-student", formData);

        const res = await axios.post("http://127.0.0.1:8000/api/add-student", this.state);
        // console.log(res);
        if (res.data.status === 200) {
            console.log(res.data.message);

            swal({
                title: "Success !",
                text: res.data.message,
                icon: "success",
                button: "OK!",
            });

            this.setState({
                name: '',
                course: '',
                email: '',
                phone: '',
                // file_path:''
            });
            this.props.history.push("/");
        }
        else {
            this.setState({
                error_list: res.data.validate_err    // set errors on error_list
            })

        }
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                               
                                <h4> Add Student
                                    <Link to={"/"} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h4>
                            </div>

                            <div className="card-body">

                                <form onSubmit={this.saveStudent}>

                                    <div className="form-group mb-3">
                                        <label>Student Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" placeholder="Enter Name" />
                                        <span className="text-danger">{this.state.error_list.name}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Student Course</label>
                                        <input type="text" name="course" onChange={this.handleInput} value={this.state.course} className="form-control" placeholder="Enter Course" />
                                        <span className="text-danger">{this.state.error_list.course}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Student Email</label>
                                        <input type="email" name="email" onChange={this.handleInput} value={this.state.email} className="form-control" placeholder="Enter Email" />
                                        <span className="text-danger">{this.state.error_list.email}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Student Phone</label>
                                        <input type="text" name="phone" onChange={this.handleInput} value={this.state.phone} className="form-control" placeholder="Enter PHone" />
                                        <span className="text-danger">{this.state.error_list.phone}</span>
                                    </div>

                                    {/* <div className="form-group mb-3">
                                        <label>Image</label>
                                        <input onChange={this.onFileChange} type="file" name="file_path" className="form-control"/>
                                        <span className="text-danger">{this.state.error_list.file_path}</span>
                                    </div> */}

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary"> Save Student </button>
                                    </div>


                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddStudent;