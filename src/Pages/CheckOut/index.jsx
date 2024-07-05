import React, { useState } from 'react';
import Modal from "../../components/modal";
import PaymentCard from '../../components/card/PaymentCard';
import * as yup from 'yup';
import { useFormik } from 'formik';



const validationAddress = yup.object({
  Pincode:yup.string().max(6,'Pincode should not be greater than 6').required("pincode is required"),
  firstName:yup.string().required().trim(),
  lastName:yup.string().required().trim(),
  password:yup.string().min(5, 'Password should be of minimum 5 characters length').required('Password is required').trim(),
  houseNumber:yup.string().trim().required(),
  street:yup.string().required().trim(),
  state:yup.string().trim().required(),
  city:yup.string().trim().required(),
  mobileNumber:yup.string().max(10,"mobile number must be 10 digit no.").min(10,"mobile number must be 10 digit no.").required("mobile number must be 10 digit no."),
});

const CheckOut = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(0);
  const [Address, setAddress] = useState("");


  const formik = useFormik({
    initialValues: {
        Pincode: '',
        firstName: '',
        lastName:"",
        password:'',
        houseNumber:'',
        street:'',
        state:'',
        city:'',
        mobileNumber:'',
        landMark:'',
        landline:''
    },
    validationSchema: validationAddress,
    onSubmit: (values,action) => {
        console.log(values);
        setAddress(values);
        closeModal();
        action.resetForm();
    },
})

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      setOpenAccordion(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setOpenAccordion(currentStep - 1);
    }
  };

  const handleAccordionToggle = (index) => {
    if (index === openAccordion) {
      setOpenAccordion(-1);
    } else if (index === currentStep) {
      setOpenAccordion(index);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div
        className={`border border-gray-300 rounded-md mb-4 ${
          openAccordion === 0 ? 'bg-gray-100' : 'bg-white'
        }`}
      >
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => handleAccordionToggle(0)}
        >
          <h2 className="text-lg font-semibold">DELIVERY METHOD</h2>
          {currentStep===0 && 
          <span
            className={`transition-transform ${
              openAccordion === 0 ? 'transform rotate-180' : ''
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        }
        </div>
        {
          Address?(<div>zero</div>):( <> {openAccordion === 0 && (
              <div className="p-4 border-t border-gray-300">
                <span onClick={openModal} className='p-2 border border-sky-500 rounded text-sm cursor-pointer'>ADD SHIPPING ADDRESS</span>
                {currentStep === 0 && (
                  <div className="mt-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleNextStep}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </>)
        }
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="flex justify-between p-3 bg-[#3399CC] text-white rounded-t-lg">
                <div className="font-bold ">Add a New Address</div>
                <div onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-5 flex flex-col gap-6">
                <div className=''>
                    <div className="border border-slate-700 rounded-sm w-[49.2%]">
                        <input 
                            placeholder="Enter Pincode*" 
                            className="w-full h-9 p-2"
                            type='number'
                            name="Pincode"
                            value={formik.values.Pincode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.errors.Pincode && formik.touched.Pincode?(<p className="text-red-600">{formik.errors.Pincode}</p>):null}
                </div>
                <div className='flex w-full justify-between gap-5'>
                  <div className='w-full'>
                      <div className="border border-slate-700 rounded-sm ">
                          <input 
                              placeholder="Enter First Name*" 
                              className="w-full h-9 p-2"
                              name="firstName"
                              value={formik.values.firstName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />
                      </div>
                      {formik.errors.firstName && formik.touched.firstName?(<p className="text-red-600">{formik.errors.firstName}</p>):null}
                  </div>
                  <div className='w-full'>
                      <div className="border border-slate-700 rounded-sm">
                          <input 
                              placeholder="Enter Last Name*" 
                              className="w-full h-9 p-2"
                              name="lastName"
                              value={formik.values.lastName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />
                      </div>
                      {formik.errors.lastName && formik.touched.lastName?(<p className="text-red-600">{formik.errors.lastName}</p>):null}
                  </div>
                </div>
                <div className=''>
                    <div className="border border-slate-700 rounded-sm w-[49.2%]">
                        <input 
                            placeholder="Enter Flat / House No. / Floor / Building Name*" 
                            className="w-full h-9 p-2"
                            name="houseNumber"
                            value={formik.values.houseNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.errors.houseNumber && formik.touched.houseNumber?(<p className="text-red-600">{formik.errors.houseNumber}</p>):null}
                </div>
                <div className=''>
                    <div className="border border-slate-700 rounded-sm w-[49.2%]">
                        <input 
                            placeholder="Enter Colony / Street*" 
                            className="w-full h-9 p-2"
                            name="street"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.errors.street && formik.touched.street?(<p className="text-red-600">{formik.errors.street}</p>):null}
                </div>
                <div className=''>
                    <div className="border border-slate-700 rounded-sm w-[49.2%]">
                        <input 
                            placeholder="Enter Land Mark" 
                            className="w-full h-9 p-2"
                            name="landMark"
                            value={formik.values.landMark}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                </div>
                <div className='flex w-full justify-between gap-5'>
                  <div className='w-full'>
                      <div className="border border-slate-700 rounded-sm ">
                          <input 
                              placeholder="Enter City*" 
                              className="w-full h-9 p-2"
                              name="city"
                              value={formik.values.city}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />
                      </div>
                      {formik.errors.city && formik.touched.city?(<p className="text-red-600">{formik.errors.city}</p>):null}
                  </div>
                  <div className='w-full'>
                      <div className="border border-slate-700 rounded-sm">
                          <input 
                              placeholder="Enter State*" 
                              className="w-full h-9 p-2"
                              name="state"
                              value={formik.values.state}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />
                      </div>
                      {formik.errors.state && formik.touched.state?(<p className="text-red-600">{formik.errors.state}</p>):null}
                  </div>
                </div>
                <div className='flex w-full justify-between gap-5'>
                  <div className='w-full'>
                      <div className="border border-slate-700 rounded-sm ">
                          <input 
                              placeholder="Enter Mobile Number*" 
                              className="w-full h-9 p-2"
                              name="mobileNumber"
                              value={formik.values.mobileNumber}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />
                      </div>
                      {formik.errors.mobileNumber && formik.touched.mobileNumber?(<p className="text-red-600">{formik.errors.mobileNumber}</p>):null}
                  </div>
                  <div className='w-full'>
                      <div className="border border-slate-700 rounded-sm">
                          <input 
                              placeholder="Enter Landline Number" 
                              className="w-full h-9 p-2"
                              name="landline"
                              value={formik.values.landline}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />
                      </div>
                  </div>
                </div>
                <div className='flex justify-end gap-2'>
                  <button className='px-5 py-1 border border-red-500 text-red-500'>CANCEL</button>
                  <button className='px-5 py-1 bg-red-500 text-white' type="submit">SUBMIT</button>
                </div> 
              </div>
            </form>
        </Modal>
      </div>

      <div
        className={`border border-gray-300 rounded-md mb-4 ${
          openAccordion === 1 ? 'bg-gray-100' : 'bg-white'
        }`}
      >
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => handleAccordionToggle(1)}
        >
          <h2 className="text-lg font-semibold">ORDER DETAILS</h2>
          {currentStep===1 && 
          <span
            className={`transition-transform ${
              openAccordion === 1 ? 'transform rotate-180' : ''
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        }
        </div>
        {openAccordion === 1 && (
          <div className="p-4 border-t border-gray-300">
            <div className=''>
              <div className='flex'>
                <div className='w-[70%]'>product name</div>
                <div className='flex w-[30%] justify-between'>
                  <div>Qty: 1</div>
                  <div>rs 1799</div>
                </div>
              </div>
              <hr />
              <div className='flex justify-end'>
                <div className='flex w-[30%] justify-between'>
                  <span className=''>Total:</span>
                  <span>1799</span>
                </div>
              </div>
            </div>

            {currentStep === 1 && (
              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handlePrevStep}
                >
                  Prev
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className={`border border-gray-300 rounded-md mb-4 ${
          openAccordion === 2 ? 'bg-gray-100' : 'bg-white'
        }`}
      >
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => handleAccordionToggle(2)}
        >
          <h2 className="text-lg font-semibold">PAY SECURELY</h2>
          {currentStep===2 && 
          <span
            className={`transition-transform ${
              openAccordion === 2 ? 'transform rotate-180' : ''
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
          }
        </div>
        {openAccordion === 2 && (
          <div className="p-4 border-t border-gray-300">
            <div>
              <PaymentCard/>
            </div>
            
            {currentStep === 2 && (
              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handlePrevStep}
                >
                  Prev
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOut;