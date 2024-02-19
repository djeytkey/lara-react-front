import { useEffect, useState } from "react";
import Http from "./Http";
import { useNavigate, useParams } from "react-router-dom";

export default function View(props) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const {id} = useParams();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        Http.get('/users/'+id+'/edit').then((res) => {
            setInputs({
                name:res.data.name,
                email:res.data.email,
            });
        })
    }

    return (
        <div>
            <h2>View user</h2>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <h4>Name</h4>
                        <p>{inputs.name}</p>
                        <h4>Email</h4>
                        <p>{inputs.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}