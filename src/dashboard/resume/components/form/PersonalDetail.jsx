/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";

function PersonalDetail({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setResumeInfo({ ...resumeInfo, [name]: value });
  };

  const onSave = (e) => {
    e.preventDefault();
    enableNext(true);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get Started with your basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input name="firstName" required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input name="lastName" required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input name="jobTitle" required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input name="address" required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input name="phone" required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input name="email" required onChange={handleInputChange} />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
