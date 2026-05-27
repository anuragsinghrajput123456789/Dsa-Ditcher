
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SheetFooter } from "@/components/ui/sheet";

interface FormData {
  title: string;
  description: string;
  problems: string;
}

interface DsaSheetFormProps {
  onSubmit: (data: Omit<FormData, "id">) => void;
  initialData: FormData | null;
  onClose: () => void;
}

const DsaSheetForm: React.FC<DsaSheetFormProps> = ({
  onSubmit,
  initialData,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    problems: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ title: "", description: "", problems: "" });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      alert("Title is required.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Sheet Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="problems">Problems</Label>
        <Textarea
          id="problems"
          name="problems"
          value={formData.problems}
          onChange={handleChange}
          rows={10}
          placeholder="Add one problem link per line."
        />
      </div>
      <SheetFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save Sheet</Button>
      </SheetFooter>
    </form>
  );
};

export default DsaSheetForm;
