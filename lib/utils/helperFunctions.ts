import fs from 'fs/promises'
import { createClient } from '../supabase/server'
import { ErrHandlingPollsArguments } from '../types'
import noImage  from "@/public/no-image.webp"

export const manageImage  = async (imageFile  : any): Promise<string | null> => {
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

export const uploadImage = async (imageFile: string | File ): Promise<{ success: boolean, fileName?: string, error?: any }> => {
    const supabase = await createClient()
    const defaultImageName = "no-image.webp"
    
    if (!(imageFile instanceof File) || imageFile.size < 1) {
        return {success: true,  fileName: defaultImageName }
    }   

    
    try {
        const { error } = await supabase
            .storage
            .from("images")
            .upload(imageFile.name, imageFile)
        if (error) {
            throw error
        }

        return { success: true, fileName: imageFile.name }
    } catch (error: any) {
        if (error.statusCode === '409' || error.message === 'The resource already exists' || error === 'Duplicate') {
            error.message = "Не може да има 2 еднакви снимки"
        }
        return { success: false, error }
    }
}
export const updateImage = async (imageFile: string | File, prevImage: any) => {
    const supabase = await createClient()


    if (!(imageFile instanceof File) || imageFile.size < 1) {
        return { success: true,  fileName: prevImage.name }
    }   

    const isImageNew = imageFile.name !== prevImage.name

    try {
        if (!isImageNew) return { success: true, fileName: imageFile.name }
        

        const { data: deleteData, error: deletePrevImageError } = await supabase
            .storage
            .from("images")
            .remove([prevImage])

        if (deletePrevImageError) throw deletePrevImageError
        
        const { error: uploadImageError } = await supabase
            .storage
            .from("images")
            .upload(imageFile.name, imageFile)

        if (uploadImageError) throw uploadImageError
        return { success: true, fileName: imageFile.name }
    } catch (error: any) {
        if (error.code === 409 || error.message === 'The resource already exists') {
            error.message = "Не може да има 2 еднакви снимки";
        }
        return { success: false, error }
    }
}


export const errHandlingPolls = (args: ErrHandlingPollsArguments) => {
    const { title, message, code, starts_at, ends_at} = args

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
        return {message: "Заглавиетот вече съществува"}
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
    if(code === '23502'){
        return {message: "Моля въведете изображение"} 
    }
}

export const formatDate = (dateString: Date | string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

