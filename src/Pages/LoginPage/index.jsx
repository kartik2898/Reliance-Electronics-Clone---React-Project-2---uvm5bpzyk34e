import img from "../../Assets/LoginWebBanner.avif"
import { useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import AuthService from "../../service/AuthService";
function Login(){

    const validationLoginSchema = yup.object({
        email:yup.string().email("The email address you entered is not valid.").required("email is required"),
        password:yup.string().min(5, 'Password should be of minimum 5 characters length').required('Password is required').trim()
    });

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationLoginSchema,
        onSubmit: (values,action) => {
            console.log(values);
            
            handleLogin(values)
            action.resetForm();
        },
    })

    const handleLogin = (values) => {
        AuthService.login(values.email, values.password).then((res) => {
            localStorage.setItem('userDetail', JSON.stringify(res?.data?.data))
            localStorage.setItem('token', res?.data?.token)
            localStorage.getItem("userDetail");
            console.log(localStorage.getItem("userDetail"))
            setTimeout(() => {
                navigate('/home');
            }, 100);
        })
    }
    

    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex p-8 gap-7">
                    <div className="">
                        <img src={img}/>
                    </div>
                    <div className="w-3/6 shadow-xl rounded">
                        <div className="p-5 bg-slate-100">Login / Register</div>
                        <div className="p-4 flex flex-col gap-7">
                            <div>
                                <div className="border border-slate-700 rounded-sm">
                                    <input 
                                        placeholder="Enter Email Address" 
                                        className="w-full h-9 p-2"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.errors.email && formik.touched.email?(<p className="text-red-600">{formik.errors.email}</p>):null}
                            </div>
                            <div>
                                <div className="border border-slate-700 rounded-sm">
                                    <input 
                                        placeholder="Enter Password"
                                        className="w-full h-9 p-2"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.errors.password && formik.touched.password?(<p className="text-red-600">{formik.errors.password}</p>):null}
                            </div>
                            <div>
                                <button type="submit" className="bg-red-600 p-2.5 rounded text-white w-full">
                                    PROCEED
                                </button>
                                <div className="flex gap-2 justify-center p-2">
                                    <p>Not a Registered User?</p>
                                     
                                    <Link to={"/signup"} className="text-red-600 hover:text-blue-500">SIGN UP</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login