'use client'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from '@radix-ui/themes'
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueFprm {
    title: string
    description: string
}

const NewIsuuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<IssueFprm>();

    return (
        <form className='max-w-xl space-y-3'
            onSubmit={handleSubmit((data) => {
                axios.post("/api/issues", data);
                router.refresh();
                router.push("/issues");
            }


            )}>
            <TextField.Root placeholder="Title" {...register("title")}>
                <TextField.Slot>
                </TextField.Slot>
            </TextField.Root>
            <Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description…"{...field} />} />
            <Button>Submit New Issue</Button>
        </form>
    )
}

export default NewIsuuePage