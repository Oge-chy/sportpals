import React, { startTransition, useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ILevel } from '@/lib/database/models/level.model'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Input } from '../ui/input'
import { createLevel, getAllLevels } from '@/lib/actions/level.actions'
  

type DropdownProps ={
    value?: string
    onChangeHandler?: () => void
}

const Dropdown = ({value, onChangeHandler}: DropdownProps) => {
    const[levels, setLevels] = useState<ILevel[]>([])
    const[newLevel, setNewLevel] = useState("")

const handleAddLevel = () => {
    createLevel({
        levelName: newLevel.trim()
    })
    .then((level) => {
        setLevels((prevState) => [...prevState, level])
    })
}

    useEffect(() => {
        const getLevels = async () => {
            const levelList = await getAllLevels()

            levelList && setLevels(levelList as ILevel[])
        }

        getLevels()
    }, [])

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
                {levels.length > 0 && levels.map((level) => (
                    <SelectItem key={level._id} value={level._id}
                    className="select-item p-regular-14">
                    {level.name}
                    </SelectItem>
                ))}

                <AlertDialog>
                    <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-black hover:bg-primary-50 focus:text-black">Select Level</AlertDialogTrigger>
                    <AlertDialogContent className='bg-white'>
                        <AlertDialogHeader>
                        <AlertDialogTitle>New Level</AlertDialogTitle>
                        <AlertDialogDescription>
                            <Input type="text" placeholder="LevelName"
                            className="input-field mt-3" onChange={(e) => setNewLevel(e.target.value)}/>
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => startTransition(handleAddLevel)}>Add</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </SelectContent>
        </Select>

    )
}

export default Dropdown