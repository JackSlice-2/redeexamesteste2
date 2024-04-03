"use client";

import React, { useCallback } from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';
import Loader from '../Loader';

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange])

  return (

    <CldUploadWidget 
    onUpload={handleUpload}
    uploadPreset='fhuoj0gz'
    options={{
        maxFiles: 1
    }}
>
    {({ open, cloudinary, widget, error, isLoading, results }) => {

        if (error) {
            console.error(error);
            return <div>Error occurred</div>;
        }
        if (isLoading) {
            return (
                <div style={{ transform: 'translateY(-200px)' }}>
                    <Loader />
                </div>
            );
        }

        return (
            <div onClick={() => open ? open() : null} 
                className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
                    <TbPhotoPlus size={50}/>
                    <div className="font-semibold text-lg">
                        Adcionar uma Imagem ao Anuncio
                    </div>
                    {value && (
                        <div className="absolute inset-0 w-full h-full">
                            <Image
                            alt='upload'
                            fill
                            style={{ objectFit: 'cover'}}
                            src={value}
                            />
                        </div>
                    )}
                </div>
            )
        }}
</CldUploadWidget>
  )
}

export default ImageUpload
