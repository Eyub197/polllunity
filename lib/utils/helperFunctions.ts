import fs from 'fs/promises'

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