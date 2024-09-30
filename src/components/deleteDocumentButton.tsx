"use client";

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { TrashIcon } from "lucide-react";

export default function DeleteDocumentButton({documentId} : {documentId: string}) {
    const router = useRouter();

    const deleteDocument = async () => {
        try {
            await fetch(`/api/document/`, {
                method: "DELETE",
                body: JSON.stringify({ documentId }),
            });
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button 
            size="icon"
            variant="destructive" 
            onClick={deleteDocument}  
        >
            <TrashIcon className=" h-4 w-4" />
        </Button>
    );
}