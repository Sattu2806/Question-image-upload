import { z } from "zod"

export const QuestionForm = z.object({
    subject: z.string().refine(value => !!value, {
        message: "Subject is mandatory"
    }),
    class:z.number().refine(value => !!value, {
        message: "Class field is mandatory"
    }),
    question: z.string().refine(value => !!value, {
        message: "Question is mandatory"
    }),
    chapter: z.number().refine(value => !!value, {
        message: "chapter Number is mandatory"
    }),
    questionImage:z.string().optional(),
    chapterName: z.string().refine(value => !!value, {
        message: "Chapter Name is Mandatory"
    }),
    options: z.array(z.object({
        option:z.string().refine(value => !!value, {
            message: "Answer is mandatory"
    })
    })).default([{option:''}]),
    answer: z.string().refine(value => !!value, {
        message: "Answer is mandatory"
    }),
    explanation: z.string().refine(value => !!value, {
        message: "Explanation is mandatory"
    }),
    images: z.array(
    z.object({
        url: z.string(),
    }),
    ),
    startDate: z.date().refine((value) => {
        // Your validation logic here
        return true; // Replace with your validation condition
    }, { message: "Please provide a Start date." }),
    endDate: z.date().refine((value) => {
        // Your validation logic here
        return true; // Replace with your validation condition
    }, { message: "Please provide a End date." }),
})

export type QuestionFormT = z.infer<typeof QuestionForm>
