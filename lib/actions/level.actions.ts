"use server"

import { CreateLevelParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Level from "../database/models/level.model"

export const createLevel = async ({ levelName }: CreateLevelParams) => {
  try {
    await connectToDatabase();

    const newLevel = await Level.create({ name: levelName });

    return JSON.parse(JSON.stringify(newLevel));
  } catch (error) {
    handleError(error)
  }
}

export const getAllLevels = async () => {
  try {
    await connectToDatabase();

    const levels = await Level.find();

    return JSON.parse(JSON.stringify(levels));
  } catch (error) {
    handleError(error)
  }
}