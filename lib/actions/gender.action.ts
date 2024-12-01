"use server"

import { CreateGenderParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Gender from "../database/models/gender.model"

export const createGender = async ({ genderName }: CreateGenderParams) => {
  try {
    await connectToDatabase();

    const newGender = await Gender.create({ name: genderName });

    return JSON.parse(JSON.stringify(newGender));
  } catch (error) {
    handleError(error)
  }
}

export const getAllGenders = async () => {
  try {
    await connectToDatabase();

    const genders = await Gender.find();

    return JSON.parse(JSON.stringify(genders));
  } catch (error) {
    handleError(error)
  }
}