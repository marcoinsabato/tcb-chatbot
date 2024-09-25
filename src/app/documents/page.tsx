import UploadFileButton from "@/components/uploadFileButton";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import { PrismaClient, Prisma } from '@prisma/client'
export default async function Documents() {

    const prisma = new PrismaClient();

    const documents = await prisma.document.findMany();


    return (
        <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">Documents</h1>
            <UploadFileButton />
        </header>
        <main className="">
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Path</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {documents.map((document) => (
                        <TableRow key={document.id}>
                            <TableCell className="font-medium">{document.id}</TableCell>
                            <TableCell>{document.name}</TableCell>
                            <TableCell>{document.path}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell className="text-right">{documents.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

            </div>
        </main>
        </div>
    )
}
  