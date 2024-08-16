import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import prisma from "@/prisma/client";

// Define the schema for issue validation
const createIssuesSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});

// Handle the POST request
export async function POST(request: NextRequest) {
    // Parse the request body
    const body = await request.json();

    // Validate the body against the schema
    const val = createIssuesSchema.safeParse(body);

    // If validation fails, return a 400 error with the issues
    if (!val.success) {
        return NextResponse.json({ error: val.error.issues }, { status: 400 });
    }

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    });
    

    // Return the created issue with a 201 status
    return NextResponse.json(newIssue, { status: 201 });
}
