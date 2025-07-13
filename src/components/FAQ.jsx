import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const FAQ = () => {
  return (
    <div className="max-w-100vw max-h-100vh p-32 pb-4 pt-20 flex flex-col justify-center items-center ">
      <h2 className="text-3xl font-bold text-center w-full font-serif mb-[50px]">
        Frequently Asked Questions
      </h2>
      <div className=" w-full gap-[45px] p-[32px] flex justify-center items-center border-slate-200 border-t-[50%] border-l-2">
        <div className="  w-[550px] h-[450px] rounded-[18px] transform skew-y-2 hover:skew-y-0 hover:rotate-1 hover:scale-105 transition-all duration-500 ease-in-out shadow-sm">
          <img
            src="./faq.webp"
            alt="FAQ"
            className="w-full h-full rounded-[18px] object-cover"
          />
        </div>
        <div className="w-[1200px] flex flex-col items-center justify-center space-y-3 ">
          <Accordion type="single" collapsible className="w-full text-2xl">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold">
                How accurate are the career recommendations ?
              </AccordionTrigger>
              <AccordionContent className="text-gray-500">
                Our career recommendations are powered by advanced machine
                learning algorithms and expert-curated datasets, ensuring a high
                degree of accuracy and relevance to your profile.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="border-b-gray-800"></div>

          <Accordion type="single" collapsible className="w-full text-2xl">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold">
                Is my data secure on your platform ?
              </AccordionTrigger>
              <AccordionContent className="text-gray-500">
                We prioritize your data security. All your personal information
                and career data are encrypted and stored securely, adhering to
                the highest industry standards.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full text-2xl">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="text-gray-500">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {/* <div className="flex justify-center items-center gap-x-6 p-[32px] bg-red-500">
        
      </div> */}
    </div>
  );
};

export default FAQ;
