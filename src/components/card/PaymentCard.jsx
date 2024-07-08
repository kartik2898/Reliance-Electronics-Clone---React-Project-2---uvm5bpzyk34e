import paymentImg from "../../Assets/payment_logos_cc.webp";
import * as yup from 'yup';
import { useFormik } from 'formik';

function PaymentCard() {
    const validationPaymentCard = yup.object({
        bank: yup.string().required("You have to choose a bank name"),
        cardNumber: yup.string().required("Card number is required").matches(/^\d{16}$/, "Card number should be 16 digits"),
        name: yup.string().required("Name is required").trim(),
        months: yup.string().required("Month is required").trim(),
        year: yup.string().required("Year is required"),
        cvv: yup.string().min(3, "CVV should be 3 digits").max(3, "CVV should be only 3 digits").required("CVV is required"),
        termAndcondition: yup.boolean().oneOf([], 'You need to accept the terms and conditions').required(),
    });

    const formik = useFormik({
        initialValues: {
            bank: '',
            cardNumber: '',
            name: '',
            months: "",
            year: '',
            cvv: '',
            termAndcondition: false,
        },
        validationSchema: validationPaymentCard,
        onSubmit: (values, action) => {
            console.log(values);
            action.resetForm();
        },
    });

    return (
        <div className="flex">
            <div className="w-[18%] border-r border-gray-500">
                <div className="border-b border-gray-500 p-4">Credit Card</div>
                <div className="border-b border-gray-500 p-4">Debit Card</div>
                <div className="border-b border-gray-500 p-4">Credit Card EMI</div>
                <div className="border-b border-gray-500 p-4">Net Banking</div>
                <div className="border-b border-gray-500 p-4">UPI</div>
                <div className="border-b border-gray-500 p-4">Wallet</div>
            </div>
            <div className="pl-4">
                <div className="flex">
                    <span>Payment Option</span>
                    <img src={paymentImg} alt="Payment Options" />
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <div>Select Bank</div>
                        <select
                            name="bank"
                            value={formik.values.bank}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">Select Bank</option>
                            <option value="american express">American Express</option>
                            <option value="au">AU</option>
                            <option value="icici bank">ICICI Bank</option>
                            <option value="state bank of india">State Bank Of India</option>
                        </select>
                        {formik.touched.bank && formik.errors.bank ? (
                            <p className="text-red-600">{formik.errors.bank}</p>
                        ) : null}
                    </div>
                    <div className="pt-1">
                        <input
                            placeholder="Enter Card Number"
                            name="cardNumber"
                            className="p-1"
                            value={formik.values.cardNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.cardNumber && formik.errors.cardNumber ? (
                            <p className="text-red-600">{formik.errors.cardNumber}</p>
                        ) : null}
                    </div>
                    <div className="pt-1">
                        <input
                            type="text"
                            placeholder="Enter Name on Card"
                            name="name"
                            className="p-1"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <p className="text-red-600">{formik.errors.name}</p>
                        ) : null}
                    </div>
                    <div>
                        <p>Expiry Date</p>
                        <div className="flex gap-2">
                            <div>
                                <select
                                    name="months"
                                    value={formik.values.months}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">MM</option>
                                    <option value="jan">Jan</option>
                                    <option value="feb">Feb</option>
                                    <option value="mar">Mar</option>
                                    <option value="apr">Apr</option>
                                    <option value="may">May</option>
                                    <option value="jun">Jun</option>
                                    <option value="jul">Jul</option>
                                    <option value="aug">Aug</option>
                                    <option value="sep">Sep</option>
                                    <option value="oct">Oct</option>
                                    <option value="nov">Nov</option>
                                    <option value="dec">Dec</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    name="year"
                                    value={formik.values.year}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">YYYY</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                    <option value="2031">2031</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="CVV"
                                    name="cvv"
                                    value={formik.values.cvv}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.cvv && formik.errors.cvv ? (
                                    <p className="text-red-600">{formik.errors.cvv}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="py-3">
                        *Clicking on “Pay” will take you to a secure payment gateway where you can make your payment. Your order will not be completed without this action.
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="termAndcondition"
                            checked={formik.values.termAndcondition}
                            onChange={formik.handleChange}
                        />
                        <span>I agree to the Terms & Conditions</span>
                        {formik.touched.termAndcondition && formik.errors.termAndcondition ? (
                            <p className="text-red-600">{formik.errors.termAndcondition}</p>
                        ) : null}
                    </div>
                    <div className="py-2">
                        <button className="px-12 py-1 bg-red-500 text-white" type="submit">Pay</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PaymentCard;
