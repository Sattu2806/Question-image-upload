import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const {
        subject,
        question,
        Class,
        questionImage,
        chapter,
        chapterName,
        options,
        answer,
        explaination,
        startDate,
        endDate,
        images
    } = body



    const newoption = options.map((optionObj:any) => optionObj.option)

    try{
    const Question = await prisma.question.create({
        data:{
            subject,
            question,
            class:Class,
            questionImage,
            chapter,
            chapterName,
            options: newoption,
            answer,
            explanation:explaination,
            startDate,
            endDate,
            images: {
                create: images.map((url: string) => url ),
           },
        }
    })
    return NextResponse.json(Question)
    }catch(error){
        console.log('Error creating the product', error)
        return NextResponse.error()
    }
}

