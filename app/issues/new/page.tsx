'use client'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssuesSchema } from "@/app/validationSchemas";
import z from "zod";
import ErrorMeassage from "@/app/components/ErrorMeassage";


type IssueFprm = z.infer<typeof createIssuesSchema>;

// interface IssueFprm {
//     title: string
//     description: string
// }

const NewIsuuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFprm>({
        resolver: zodResolver(createIssuesSchema)
    });
    const [error, setError] = useState("")
    return (
        <div className="max-w-xl">

            <ErrorMeassage>
                {errors.title?.message}
            </ErrorMeassage>

            <form className=' space-y-3'
                onSubmit={handleSubmit((data) => {
                    try {
                        axios.post("/api/issues", data);
                        router.push("/issues");
                    } catch (e) {
                        console.log(e)
                        setError("An unexpected error occurred")
                    }

                }
                )}>
                <TextField.Root placeholder="Title" {...register("title")}>
                    <TextField.Slot>
                    </TextField.Slot>
                </TextField.Root>
                <ErrorMeassage>
                    {errors.title?.message}
                </ErrorMeassage>
                <Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description…"{...field} />} />
                <ErrorMeassage>
                    {errors.description?.message}
                </ErrorMeassage>
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIsuuePage