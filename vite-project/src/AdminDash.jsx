import React,{useState} from "react";
import {useNavigate } from "react-router-dom";
import './AdminPage.css';

const AdminPage = ()=>{

    const [users,setUsers]=useState([]);
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    const handleHome = ()=>{
        navigate('/');
    }

    const fetchUsers = async()=>{
        setLoading(true);
        try {
            const response = await fetch('https://gehuquiz-sagars-projects-0f20619e.vercel.app/api/users');
            const data = await response.json();
            setUsers(data);
            // console.log(data);
            
        } catch (error) {
            console.error('Error fetching users:', error);
            console.log("Unable to fetch users");
        }finally {
            setLoading(false); // Hide loading state
        }
    }

    return(
        <div id="Admin_body">
            <header>
                <h2>Quiz Channel</h2>
                <ul id="ul">
                    <li onClick={handleHome}>Home</li>
                    <li>About</li>
                    <li>Logout</li>
                </ul>
            </header> <hr />

            <div className="Section">
                <button onClick={fetchUsers} id="adminbtn">Users</button>
                <button id="adminbtn">Contact</button>
                <button id="adminbtn">Services</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>

            {loading && <p>Loading...</p>}
            {users.length >0 && (
                <ul style={{ marginLeft: '50rem', padding: 0, listStyleType: 'none', color:'whitesmoke' }}>
                    {users.map((user)=>(
                        <li key={user._id} style={{ marginBottom: '8px' }}>
                        {/* {'Name':user.username} - {user.email} */}
                        Name :{user.username} <br /> Email : {user.email}
                    </li>
                    ))}
                </ul>
            )}
            </div>
        </div>
    );
}

export default AdminPage;