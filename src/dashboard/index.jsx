import { useUser } from "@clerk/clerk-react"
import AddResume from "./components/AddResume"
import GlobalApi from "./../../service/GlobalApi";
import { useEffect, useState } from "react";
import ResumeCardItem from "./components/ResumeCardItem";

function Dashboard() {
  const {user} = useUser();
  const [ resumeList, setResumeList] = useState([]);

  useEffect(() => {
    user && GetResumesList()
  }, [user])

  // Get Resume List
  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (response) => {
        setResumeList(response.data.data)
      }
    );
  }

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start creating AI resume to your next job role.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
        <AddResume />
        {resumeList.length && resumeList.map((resume, index) => (
          <ResumeCardItem key={index} resume={resume} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard