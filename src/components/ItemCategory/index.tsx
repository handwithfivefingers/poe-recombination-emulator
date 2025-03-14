import React from "react";
import { BASE_ITEMS } from "../../constants/baseItem";
import { Button } from "../Button";

export const ItemCategory = () => {
  return (
    <div className="flex gap-2 flex-wrap py-4">
      {BASE_ITEMS.seq.map((item) => {
        return (
          <Button className="flex-shrink-0" key={item.name_bgroup} onClick={() => console.log(item)}>
            {item.name_bgroup}
          </Button>
        );
      })}
    </div>
  );
};
