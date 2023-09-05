import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {MdDelete} from 'react-icons/md'
import {BiSolidEditAlt} from 'react-icons/bi'

const StudentList = () => {
    const [studentDetail, setStudentDetail] = useState([]);

    useEffect(() => {
        getStudents();

    }, []);

    const getStudents = async () => {
        let result = await fetch('http://localhost:5000/students', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setStudentDetail(result);
    }

    const deleteStudent = async (id) => {
        console.log(id);
        let result = await fetch(`http://localhost:5000/student/${id}`, {
            method: "delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            alert("record is deleted");
            getStudents();
        }

    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            }
            );
            result = await result.json();
            if (result) {
                setStudentDetail(result);
            }
        } else {
            getStudents();
        }

    }

    return (
        <div className='student-list'>
            <h1>Student Record</h1>
            <input type='text' className='search' onChange={searchHandle} placeholder='search Student ' />
            <ul>
                <li className='stud-list-head'>Sr. no</li>
                <li className='stud-list-head'>Name</li>
                <li className='stud-list-head'>Age</li>
                <li className='stud-list-head'>Email</li>
                <li className='stud-list-head'>Mobile</li>
                <li className='stud-list-head'>Operation</li>
            </ul>
            {
                studentDetail.length > 0 ? studentDetail.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.age}</li>
                        <li>{item.email}</li>
                        <li>{item.mobile}</li>
                        <li>< MdDelete onClick={() => deleteStudent(item._id)} className='del-student' />
                            <Link to={"/update/" + item._id}><BiSolidEditAlt className='edit-student' /></Link></li>
                    </ul>
                )
                    : <h1>No Result Found</h1>
            }

        </div>
    )
}

export default StudentList