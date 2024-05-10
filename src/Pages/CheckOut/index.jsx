import React, { useState } from 'react';

const CheckOut = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(0);

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
          <h2 className="text-lg font-semibold">Accordion 1</h2>
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
        {openAccordion === 0 && (
          <div className="p-4 border-t border-gray-300">
            This is the content for Accordion 1.
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
          <h2 className="text-lg font-semibold">Accordion 2</h2>
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
            This is the content for Accordion 2.
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
          <h2 className="text-lg font-semibold">Accordion 3</h2>
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
        </div>
        {openAccordion === 2 && (
          <div className="p-4 border-t border-gray-300">
            This is the content for Accordion 3.
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