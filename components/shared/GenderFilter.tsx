"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllGenders } from "@/lib/actions/gender.actions";
import { IGender } from "@/lib/database/models/gender.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GenderFilter = () => {
  const [genders, setGenders] = useState<IGender[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getGenders = async () => {
      const genderList = await getAllGenders();

      genderList && setGenders(genderList as IGender[])
    }

    getGenders();
  }, [])

  const onSelectGender = (gender: string) => {
      let newUrl = '';

      if(gender && gender !== 'All') {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'gender',
          value: gender
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['gender']
        })
      }

      router.push(newUrl, { scroll: false });
  }

  return (
    <Select onValueChange={(value: string) => onSelectGender(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>

        {genders.map((gender) => (
          <SelectItem value={gender.name} key={gender._id} className="select-item p-regular-14">
            {gender.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default GenderFilter