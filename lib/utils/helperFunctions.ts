import fs from 'fs/promises'
import { createClient } from '../supabase/server'

export const manageImage  = async (imageFile : any): Promise<string | null> => {
    if(!(imageFile instanceof File) || imageFile.size < 1) {
      return null  
    } 

    try{
        const filename = imageFile?.name 
        const filepath = `public/uploads/${filename}`
        const bufferedImage = await imageFile.arrayBuffer()
        await fs.writeFile(filepath, Buffer.from(bufferedImage));
            return `/uploads/${filename}`

    } catch (error) {
        console.error("Error uploading the image:", error);
        throw new Error("Имаше грешка при качването на изображението");
    }
}

export const uploadImage = async(imageFile: File) => {
    const supabase = await createClient()
    
    if(!(imageFile instanceof File) || imageFile.size < 1) {
        return null  
    } 

    try {
        const {error} = await supabase
        .storage
        .from("images")
        .upload(imageFile.name, imageFile)
        
        console.log(error)
        if(error) throw error

        const fileName = imageFile.name
        const filePath = `images/${fileName}`

        return filePath
    } catch (error : any) {
        return error.message
    }   
}

interface ErrHandlingPollsArguments {
    message: string,
    code: string,
    title: string,
    starts_at: string,
    ends_at: string,
}

export const errHandlingPolls = (args: ErrHandlingPollsArguments) => {
    const { title, message, code, starts_at, ends_at } = args

    if(message === 'new row for relation "polls" violates check constraint "ends_at"'){
        return { message: "Крайната дата трябва да е по-късна от датата на започване" }
    }
    if(code === '23514' && !title.length){
        return {message: "Моля, въведете заглавие"}
    }
    if(code === '22P02'){
        return {message: "Моля, въведете id на катеогория"}
    }
    if(code === '23505'){
        return {message: "Вече съществува анкета с това име"}
    }
    if(code === '22007'){
        if(!starts_at.length){
            return { message: "Моля въведете стартираща дата" }
        }
        if(!ends_at.length){
            return { message: "Моля въведете крайна дата" }
        }
        return {message: "Неправилен формат на датата"}
    }
}




// export interface IError {
//         message: string
// }

// export const checkError = (error: IError | null | undefined, substring: string): boolean =>  {
//     return !error?.message?.includes(substring)
// }