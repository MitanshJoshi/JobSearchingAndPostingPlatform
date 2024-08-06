import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorks = () => {
  return (
    <section className="bg-primary3 py-10 mt-52">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center mb-10">How does it work?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-white p-6 shadow-lg rounded-lg text-center hover:bg-black hover:text-white">
            <div className="icon text-blue-400 text-5xl mb-4 mx-auto flex justify-center text-center gap-5 items-center">
              <LuUserPlus />
            </div>
            <h4 className="text-xl font-semibold mb-4 flex justify-center items-center">Create an Account</h4>
            <p className="">
              Sign up for a free account as a job seeker or employer. Set up your
              profile in minutes to start posting jobs or applying for jobs.
              Customize your profile to highlight your skills or requirements.
            </p>
          </div>
          <div className="card bg-white p-6 shadow-lg rounded-lg text-center hover:bg-black hover:text-white">
            <div className="icon text-blue-500 text-5xl mb-4 mx-auto flex justify-center text-center gap-5 items-center">
              <VscTasklist />
            </div>
            <h4 className="text-xl font-semibold mb-4 flex justify-center items-center">Post or Browse Jobs</h4>
            <p className="">
              Employers can post detailed job descriptions, and job seekers can
              browse a comprehensive list of available positions. Utilize filters
              to find jobs that match your skills and preferences.
            </p>
          </div>
          <div className="card bg-white p-6 shadow-lg rounded-lg text-center hover:bg-black hover:text-white">
            <div className="iicon text-blue-500 text-5xl mb-4 mx-auto flex justify-center text-center gap-5 items-center">
              <BiSolidLike />
            </div>
            <h4 className="text-xl font-semibold mb-4 flex justify-center items-center">Hire or Get Hired</h4>
            <p className="">
              Employers can shortlist candidates and extend job offers. Job
              seekers can review job offers and accept positions that align with
              their career goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
