/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "../../../../../service/AIModal";

const prompt =
  "Job Title: {jobTitle}, Depends on job title give me summery for my resume within 4-5 lines in JSON format with field experience Level and Summery with Experience level for Fresher, Mid-Level, Experienced.";

export default function Summery({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState();

  useEffect(() => {
    summery && setResumeInfo({ ...resumeInfo, summery });
  }, [summery]);

  const generateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);
    const result = await AIChatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()));
    setAiGeneratedSummeryList(JSON.parse([result.response.text()]));
    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: { summery },
    };

    GlobalApi.UpdateResumeDetails(params.resumeId, data)
      .then((response) => {
        console.log(response);
        enableNext(true);
        setLoading(false);
        toast("Summery updated");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Add Summery for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-primary text-primary flex gap-2"
              onClick={() => generateSummeryFromAI()}
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            required
            className="mt-5"
            onChange={(e) => setSummery(e.target.value)}
            name="summery"
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && (
        <div>
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div key={index}>
              <h2 className="font-bold my-1">Level {item?.experienceLevel}</h2> 
              <p>{item?.summery}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
