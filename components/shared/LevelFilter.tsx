"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllLevels } from "@/lib/actions/level.actions";
import { ILevel } from "@/lib/database/models/level.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const LevelFilter = () => {
  const [levels, setLevels] = useState<ILevel[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const getLevels = async () => {
        const levelList = await getAllLevels()

        levelList && setLevels(levelList as ILevel[])
    }

    getLevels()
}, [])


  const onSelectLevel = (level: string) => {
      let newUrl = '';

      if(level && level !== 'All') {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'level',
          value: level
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['level']
        })
      }

      router.push(newUrl, { scroll: false });
  }

  return (
    <Select onValueChange={(value: string) => onSelectLevel(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Level" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>

        {levels.map((level) => (
          <SelectItem value={level.name} key={level._id} className="select-item p-regular-14">
            {level.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default LevelFilter