'use client'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextArea, TextField } from '@radix-ui/themes'
const NewIsuuePage = () => {
    return (
        <div className='max-w-xl space-y-3'>
            <TextField.Root placeholder="Title">
                <TextField.Slot>
                </TextField.Slot>
            </TextField.Root>
            <SimpleMDE placeholder="Description…" />
            <Button>Submit New Issue</Button>
        </div>
    )
}

export default NewIsuuePage