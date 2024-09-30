'use client'

import { DiamondPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation';



export default function UploadFileButton() {

    const router = useRouter();

    const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if (!file) {
            alert('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append("file", file);


        const response = await fetch("/api/document", {
            method: "POST",
            body: formData,
        });

        if(response.status === 200) {
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