'use client'

import { DiamondPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';


export default function UploadFileButton() {
    const supabase = createClientComponentClient();
    const router = useRouter();

    const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if (!file) {
            alert('No file selected.');
            return;
        }

        const bucket = "documents"
    
        // Call Storage API to upload file
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(file.name, file);

        // Handle error if upload failed
        if(error) {
            alert('Error uploading file.');
            return;
        }

        const createDocumentRequest = await fetch('/api/document', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: data.id,
                name: file.name,
                path: data.path,
                fullPath: data.fullPath
            })
        });

        const createDocumentResponse = await createDocumentRequest.json();

        if(createDocumentResponse.status === 200) {

            router.refresh();
            return;
        }


    };

    return (
        <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
            type="button"
        >
            <Label className="ml-auto w-full h-full flex gap-1.5 items-center cursor-pointer" htmlFor="uploadFile">
                <DiamondPlus className="size-3.5" />
                Add Document
            </Label>
            <Input className="hidden" id="uploadFile" type="file" onChange={uploadFile} />
        </Button>
    )
}