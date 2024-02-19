import { useEffect, useState } from "react";
import Http from "./Http";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit(props) {
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

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const submitForm = () => {
        Http.put('/users/'+id, inputs).then((res) => {
            navigate('/');
        })
    }

    return (
        <div>
            <h2>Edit user</h2>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <label>Name</label>
                        <input type="text" name="name" className="form-control mb-2"
                            value={inputs.name || ''}
                            onChange={handleChange}
                        />

                        <label>Email</label>
                        <input type="email" name="email" className="form-control mb-2"
                            value={inputs.email || ''}
                            onChange={handleChange}
                        />

                        <button type="button" onClick={submitForm} className="btn btn-info mt-2">Update user</button>
                    </div>
                </div>
            </div>
        </div>
    )
}