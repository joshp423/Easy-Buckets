import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signUpAPI } from "./signUpAPI";

export default function SignUp(){

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false)


    return(
        <div className="signUp">
            <div className="signUpTitle">
                <h1>Easy Buckets</h1>
            </div>
            <form onSubmit={(e) => signUpAPI({e, setLoading, setErrors, email, password, navigate})}>
                <div className="signUpForm">
                    <div className="errorHandling">
                        {errors?.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </div>
                    <h1>Sign Up</h1>
                    <label htmlFor="username">Email: </label>
                    <input
                        name="email"
                        type="text"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="username"> Password: </label>
                    <input
                        name="password"
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    )
}