import React, { startTransition, useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IGender } from '@/lib/database/models/gender.model'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Input } from '../ui/input'
import { createGender, getAllGenders } from '@/lib/actions/gender.action'
  

type DropdownProps ={
    value?: string
    onChangeHandler?: () => void
}

const Dropdown = ({value, onChangeHandler}: DropdownProps) => {
    const[genders, setGenders] = useState<IGender[]>([])
    const[newGender, setNewGender] = useState("")

const handleAddGender = () => {
    createGender({
        genderName: newGender.trim()
    })
    .then((gender) => {
        setGenders((prevState) => [...prevState, gender])
    })
}

    useEffect(() => {
        const getGenders = async () => {
            const genderList = await getAllGenders()

            genderList && setGenders(genderList as IGender[])
        }

        getGenders()
    }, [])

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
                {genders.length > 0 && genders.map((gender) => (
                    <SelectItem key={gender._id} value={gender._id}
                    className="select-item p-regular-14">
                    {gender.name}
                    </SelectItem>
                ))}

                <AlertDialog>
                    <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-black hover:bg-primary-50 focus:text-black">Select Gender</AlertDialogTrigger>
                    <AlertDialogContent className='bg-white'>
                        <AlertDialogHeader>
                        <AlertDialogTitle>New Gender</AlertDialogTitle>
                        <AlertDialogDescription>
                            <Input type="text" placeholder="GenderName"
                            className="input-field mt-3" onChange={(e) => setNewGender(e.target.value)}/>
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => startTransition(handleAddGender)}>Add</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </SelectContent>
        </Select>

    )
}

export default Dropdown