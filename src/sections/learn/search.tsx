import { Input } from "@/components/ui/input";
import { LearnSearchProps } from "@/interfaces";
import { FC } from "react";

export const Search: FC<LearnSearchProps> = ({ handleChange, value }) => {
  return (
    <div className="lg:w-1/2 w-72 h-auto flex flex-row items-center">
      <div className="flex lg:w-full w-60 items-center space-x-2 font-secondary">
        <Input
          type="text"
          placeholder="Search in motion provider..."
          className="text-xs lg:text-sm dark"
          onChange={(e) => handleChange(e.target.value)}
          value={value}
        />
      </div>
    </div>
  );
};
