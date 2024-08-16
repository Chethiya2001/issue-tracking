'use client'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueFprm {
    title: string
    description: string
}

const NewIsuuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<IssueFprm>();
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
                <Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description…"{...field} />} />
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIsuuePage