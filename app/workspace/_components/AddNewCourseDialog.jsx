import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { v4 as uuidv4 } from 'uuid';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LucideLoader, Sparkle } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


function AddNewCourseDialog({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    includeVideo: false,
    noOfChapters: 1,
    category: "",
    level: "",
  });

  const onGenerate = async () => {
    try {
      console.log(formData);
      setIsLoading(true);
      const result = await axios.post("api/generate-course-layout", {
        courseId: uuidv4(),
        ...formData,
      });
      setIsLoading(false);
      console.log(result);
      const courseId = result?.data?.courseId;
      if (courseId) {
        toast.success("Course Layout Generated Succesfully");
        router.push(`/workspace/edit-course/${courseId}`);
      } else {
        toast.error("No courseId returned from API");
        console.error("No courseId returned from API");
      }
      
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold text-primary">
            Create New Course Using AI
          </DialogTitle>

          <DialogDescription asChild>
            <form className="grid gap-6 px-4 py-6 sm:grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col gap-1 col-span-full">
                <label className="text-sm font-medium text-gray-700">
                  Course Name
                </label>
                <Input
                  placeholder="Enter course name"
                  onChange={(event) =>
                    onHandleInputChange("name", event?.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-1 col-span-full">
                <label className="text-sm font-medium text-gray-700">
                  Course Description{" "}
                  <span className="text-xs text-muted">(optional)</span>
                </label>
                <Textarea
                  placeholder="Brief course description"
                  rows={3}
                  onChange={(event) =>
                    onHandleInputChange("description", event?.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  No. of Chapters
                </label>
                <Input
                  placeholder="e.g. 10"
                  type="number"
                  min={1}
                  onChange={(event) =>
                    onHandleInputChange("noOfChapters", event?.target.value)
                  }
                />
              </div>

              <div className="flex items-center gap-3 mt-6">
                <label className="text-sm font-medium text-gray-700">
                  Include Videos
                </label>
                <Switch
                  onCheckedChange={() =>
                    onHandleInputChange("includeVideo", !formData?.includeVideo)
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Difficulty Level
                </label>
                <Select
                  onValueChange={(value) => onHandleInputChange("level", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1 col-span-full">
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <Input
                  placeholder="e.g. Web, AI, JavaScript (comma separated)"
                  onChange={(event) =>
                    onHandleInputChange("category", event?.target.value)
                  }
                />
              </div>

              <div className="col-span-full">
                <Button
                  onClick={onGenerate}
                  type="submit"
                  className="w-full text-white gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LucideLoader className="animate-spin" />
                  ) : (
                    <Sparkle className="w-4 h-4" />
                  )}
                  {isLoading? "Generating Course Layout..." : "Generate Course"}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewCourseDialog;
