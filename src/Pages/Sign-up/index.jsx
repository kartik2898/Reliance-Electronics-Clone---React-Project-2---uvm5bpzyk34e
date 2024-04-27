import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import AuthService from '../../service/AuthService';
function SignUp(){

    const navigate = useNavigate();
    const validationSignUpSchema = yup.object({
        firstName:yup.string().trim().min(2,"Your first name needs to be at least 2 characters long.").required("first name is required"),
        lastName:yup.string().trim().min(2,"Your last name needs to be at least 2 characters long.").required("last name is required"),
        email:yup.string().email("The email address you entered is not valid.").required("email is required"),
        password:yup.string().min(5, 'Password should be of minimum 5 characters length').required('Password is required').trim()
    });

    const formik = useFormik({
        initialValues: {
            firstName:'',
            lastName:'',
            email: '',
            password: ''
        },
        validationSchema: validationSignUpSchema,
        onSubmit: (values) => {
            console.log(values);
            
            handleSignUp(values)
        },
    })

    const handleSignUp = (values) => {
        AuthService.signUp(values.firstName,values.lastName, values.email, values.password).then((res) => {
            console.log(res)
        })
        setTimeout(() => { 
            navigate('/login');
        }, 100);

    }

    return(
        <div>
            <div className="">
            <form onSubmit={formik.handleSubmit}>
                <div className="flex p-8 gap-7 justify-center">
                    <div className="w-3/6 shadow-xl rounded">
                        <div className="p-5 bg-slate-100 rounded-t">Register New Account</div>
                        <div className="p-10 flex flex-col gap-7">
                            <div>
                                <div className="border border-slate-700 rounded-sm">
                                    <input 
                                        placeholder="First Name" 
                                        className="w-full h-9 p-2"
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.errors.firstName && formik.touched.firstName?(<p className="text-red-600">{formik.errors.firstName}</p>):null}
                            </div>
                            <div>
                                <div className="border border-slate-700 rounded-sm">
                                    <input 
                                        placeholder="Last Name"
                                        className="w-full h-9 p-2"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.errors.lastName && formik.touched.lastName?(<p className="text-red-600">{formik.errors.lastName}</p>):null}
                            </div>
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
                                <button type='submit' className="bg-red-600 p-2.5 rounded text-white w-full">
                                    PROCEED
                                </button>
                                <div className="flex gap-2 justify-center p-2">
                                    <p>Already Registered?</p>
                                    <Link to={"/login"} className="text-red-600 hover:text-blue-500">LOGIN</Link> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            </div>
            <div>

            </div>
        </div>
    )
}

export default SignUp