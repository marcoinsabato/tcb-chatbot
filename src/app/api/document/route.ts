import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from '@prisma/client'


export async function POST(request: NextRequest) {
    const body = await request.json();
    const prisma = new PrismaClient();

    const uploadedFile = await prisma.document.create({
        data: {
            id: body.id,
            name: body.name,
            path: body.path,
            fullPath: body.fullPath
        }
    })

    return NextResponse.json({status: 200});
}
