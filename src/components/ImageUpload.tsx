import React, {useState, useEffect} from 'react'
import {CldUploadWidget} from "next-cloudinary"

type Props = {
    // info:any
    // updateInfo: React.Dispatch<React.SetStateAction<any>>
    imageUrls: string[]
    setImageUrls:React.Dispatch<React.SetStateAction<string[]>>
    // handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageUpload:React.FC<Props>  = ({imageUrls,setImageUrls,}) => {
    const onupload = (result:any) => {
        // updateInfo(result.info.secure_url)
        const newImageUrl = result.info.secure_url
        setImageUrls(preImageUrls => [...preImageUrls, newImageUrl])
        // handleImageChange(result)
    }

  return (
    <div className='mt-10'>
        <div className=''>
            <CldUploadWidget uploadPreset='cvdvkwuf' onUpload={onupload}>
                {({open}:any) => {
                    function handleOnclick(e: React.MouseEvent<HTMLButtonElement>){
                        e.preventDefault()
                        open()
                    }
                    return(
                        <button type='button' className='border-[1px] rounded-md p-1 px-2' onClick={handleOnclick}>
                            Upload Solution Image
                        </button>
                    )
                }}
            </CldUploadWidget>
        </div>
    </div>
  )
}

export default ImageUpload