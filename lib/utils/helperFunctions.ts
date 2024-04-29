import fs from 'fs/promises'
import { createClient } from '../supabase/server'
import { ErrHandlingPollsArguments } from '../types'
import { redirect } from 'next/navigation'

/**
 * Uploads image to supabase storage and returns its name if successful,
 * otherwise returns an error.
 *
 * @param {string | File} imageFile - image to upload
 *
 * @returns {Promise<{ success: boolean, fileName?: string, error?: any }>}
 */
export const uploadImage = async (imageFile: string | File ): Promise<{ success: boolean, fileName?: string, error?: any }> => {
    const supabase = await createClient()
    const defaultImageName = "no-image.webp"

    // if the image is not a file or empty then return the default image name
    if (!(imageFile instanceof File) || imageFile.size < 1) {
        return { success: true, fileName: defaultImageName }
    }

    try {
        // try to upload the image
        const { error } = await supabase
            .storage
            .from("images")
            .upload(imageFile.name, imageFile)

        // if there was an error throw it
        if (error) {
            throw error
        }

        // return the uploaded image name
        return { success: true, fileName: imageFile.name }

    } catch (error: any) {
        // if there was a conflict - set a custom message
        if (error.statusCode === '409' || error.message === 'The resource already exists' || error === 'Duplicate') {
            error.message = "Не може да има 2 еднакви снимки"
        }

        // return the error and success false
        return { success: false, error }
    }
}



/**
 * Updates image in supabase storage
 * @param imageFile the new image file to upload
 * @param prevImage the previous image object from supabase
 * @returns object containing success status and the new image name
 */
export const updateImage = async (imageFile: string | File, prevImage: any) => {
    const supabase = await createClient()

    // if file is not a file or empty then return the previous image name
    if (!(imageFile instanceof File) || imageFile.size < 1) {
        return { success: true,  fileName: prevImage.name }
    }   

    // if the new image has the same name as the previous one then no need to update it
    const isImageNew = imageFile.name !== prevImage.name

    try {
        if (!isImageNew) return { success: true, fileName: imageFile.name }
        
        // delete the previous image if the new one has different name
        const { data: deleteData, error: deletePrevImageError } = await supabase
            .storage
            .from("images")
            .remove([prevImage])

        if (deletePrevImageError) throw deletePrevImageError
        
        // upload the new image
        const { error: uploadImageError } = await supabase
            .storage
            .from("images")
            .upload(imageFile.name, imageFile)

        if (uploadImageError) throw uploadImageError
        return { success: true, fileName: imageFile.name }
    } catch (error: any) {
        // if there is a conflict throw a custom error message
        if (error.code === 409 || error.message === 'The resource already exists') {
            error.message = "Не може да има 2 еднакви снимки";
        }
        return { success: false, error }
    }
}

/**
 * Function that handles the error messages that are thrown by the createPoll and updatePollById functions
 * @param args - object with the error message, error code and some data
 * from the poll that was being created/updated
 * @returns object with the error message
 */
export const errHandlingPolls = (args: ErrHandlingPollsArguments) => {
    const { title, message, code, starts_at, ends_at } = args

    // if the check constraint "ends_at" is violated
    if (message === 'new row for relation "polls" violates check constraint "ends_at"') {
        return { message: "Крайната дата трябва да е по-късна от датата на започване" }
    }
    // if the title is not provided
    if (code === '23514' && !title.length) {
        return { message: "Моля, въведете заглавие" }
    }
    // if the category id is not provided
    if (code === '22P02') {
        return { message: "Моля, въведете id на катеогория" }
    }
    // if the title already exists
    if (code === '23505') {
        return { message: "Заглавиетот вече съществува" }
    }
    // if the date format is not correct
    if (code === '22007') {
        if (!starts_at.length) {
            return { message: "Моля въведете стартираща дата" }
        }
        if (!ends_at.length) {
            return { message: "Моля въведете крайна дата" }
        }
        return { message: "Неправилен формат на датата" }
    }
    // if image is not provided
    if (code === '23502') {
        return { message: "Моля въведете изображение" }
    }
}

/**
 * Formats the date into a string with the format "day month, year"
 * in the Bulgarian language (bg-BG).
 * @param dateString - date object or string in ISO format
 * @returns formatted date string
 */
export const formatDate = (dateString: Date | string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bg-BG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Handles char filters.
 * Gets the char_type form data and sets it as a query param in the URL.
 * Redirects to the home page.
 * @param formData - form data from the char filter form
 */
export const manageCharFilters = (formData: FormData) => {
    const charType = formData.get("char_type") as string
    const searchParams = new URLSearchParams()
    // if a char type is selected
    if (charType) {
        searchParams.set("char_type", charType)
    }
    // redirect to home with the query params set
    redirect(`?${searchParams}`)
}
