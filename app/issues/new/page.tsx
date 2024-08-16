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

            {error &&
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            }
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
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                <Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description…"{...field} />} />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIsuuePage