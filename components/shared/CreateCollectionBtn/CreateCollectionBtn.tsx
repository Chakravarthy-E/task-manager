"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CreateCollectionSheet from "../CreateCollectionSheet/CreateCollectionSheet";

const CreateCollectionBtn = () => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);
  return (
    <div className="w-full rounded-md bg-gradient-to-r from-blue-600 via-sky-700 to-indigo-600 p-[1px] ">
      <Button
        variant={"outline"}
        className="dark:text-white w-full bg-white dark:bg-neutral-950"
        onClick={() => setOpen(true)}
      >
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:to-indigo-800 bg-clip-text text-transparent font-bold">
          Create Collection
        </span>
      </Button>
      <CreateCollectionSheet open={open} onOpenChange={handleOpenChange} />
    </div>
  );
};

export default CreateCollectionBtn;
