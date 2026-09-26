import { useState } from 'react';
import { useForm, type SubmitHandler} from 'react-hook-form';

import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Slider from "@mui/material/Slider";
import Button from '@mui/material/Button';

import "./Seedance.css";

type Inputs = {
    mode: string;
    referenceImages?: string;
    referenceVideos?: string;
    prompt: string;
    aspect: string;
    duration: string;
    resolution: string;
}

const modes = ["Seedance 2.5 video", "Seedance 2.0 video", "Seedance 2.0 image"]
const aspects = ["16:9", "4:3", "21:9", "9:16"];
const resolutions = ["360p", "480p", "720p", "1080p"];

const Seedance = () => {
    const [mode, setMode] = useState<string>(modes[0]);
    const [aspect, setAspect] = useState<string>(aspects[0]);
    const [resolution, setResolution] = useState<string>(resolutions[0]);

    const { register, handleSubmit, reset } = useForm<Inputs>();

    const handleChangeMode = (event: SelectChangeEvent) => {
        setMode(event.target.value)
    }

    const handleChangeAspect = (event: SelectChangeEvent) => {
        setAspect(event.target.value)
    }

    const handleChangeResolution = (event: SelectChangeEvent) => {
        setResolution(event.target.value)
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        reset();
    }

    const handleDrop = (event: React.DragEvent<HTMLInputElement>) => {
        console.log(event)
    }

    return (
    <div className="seedance">
        <div className="main-area">
            <form onSubmit={handleSubmit(onSubmit)} className="input-block">
                <p>Seedance model</p>
                <div className="input-mode">
                    <p>Select mode</p>
                    <Select
                        {...register("mode")}
                        value={mode}
                        label="Age"
                        onChange={handleChangeMode}
                        >
                        {modes.map((mode, i) => {
                            return <MenuItem id={i} value={mode}>{mode}</MenuItem>
                        })}
                    </Select>
                </div>
                <div className="input-reference-images">
                    <p>Reference images (optional)</p>
                    <input {...register("referenceImages")} type="file" accept="image/*, video/*" onDrop={handleDrop} className="input-reference-images-dropzone" />
                    <p>1/30</p>
                </div>
                 <div className="input-reference-videos">
                    <p>Reference video (optional)</p>
                    <div {...register("referenceVideos")} className="input-reference-images-dropzone"></div>
                    <p>1/10</p>
                </div>
                <div className='prompt-block'>
                    <p>Prompt</p>
                    <textarea className="prompt-block-textarea" {...register("prompt")}></textarea>
                    <p>Describe the video you want to generate</p>
                </div>
                <div className="input-aspect-ratio">
                    <p>Aspect ratio</p>
                     <Select
                        {...register("aspect")}
                        value={aspect}
                        label="Age"
                        onChange={handleChangeAspect}
                        >
                        {aspects.map((aspect, i) => {
                            return <MenuItem id={i} value={aspect}>{aspect}</MenuItem>
                        })}
                    </Select>
                </div>
                <div className="input-duration">
                    <p>Duration (seconds)</p>
                    <Slider {...register("duration")} defaultValue={50} step={1} min={1} marks max={15} aria-label="Default" valueLabelDisplay="auto" />
                </div>
                <div className='input-resolution'>
                    <p>Resolution</p>
                    <Select
                        {...register("resolution")}
                        value={resolution}
                        label="Age"
                        onChange={handleChangeResolution}
                        >
                        {resolutions.map((resolution, i) => {
                            return <MenuItem id={i} value={resolution}>{resolution}</MenuItem>
                        })}
                    </Select>
                </div>
                <Button type="submit" size="large">Generate</Button>
            </form>
            <section className="result-block">
                <div className="result-block-title">
                    <p>Your results</p>
                    <p>View and manage your generation tasks</p>
                </div>
                <div className='result-block-list'>
                    <div className='result-block-task'>
                        <div className="result-block-task-status">Success</div>
                        <p className='result-block-task-prompt'>Prompt</p>
                        <div className='result-block-task-image-replacer'></div>
                        <Button size="medium">Upscale</Button>
                    </div>
                     <div className='result-block-task'>
                        <div className="result-block-task-status">Success</div>
                        <p className='result-block-task-prompt'>Prompt</p>
                        <div className='result-block-task-image-replacer'></div>
                        <Button size="medium">Upscale</Button>
                    </div>
                     <div className='result-block-task'>
                        <div className="result-block-task-status">Success</div>
                        <p className='result-block-task-prompt'>Prompt</p>
                        <div className='result-block-task-image-replacer'></div>
                        <Button size="medium">Upscale</Button>
                    </div>
                     <div className='result-block-task'>
                        <div className="result-block-task-status">Success</div>
                        <p className='result-block-task-prompt'>Prompt</p>
                        <div className='result-block-task-image-replacer'></div>
                        <Button size="medium">Upscale</Button>
                    </div>
                     <div className='result-block-task'>
                        <div className="result-block-task-status">Success</div>
                        <p className='result-block-task-prompt'>Prompt</p>
                        <div className='result-block-task-image-replacer'></div>
                        <Button size="medium">Upscale</Button>
                    </div>
                     <div className='result-block-task'>
                        <div className="result-block-task-status">Success</div>
                        <p className='result-block-task-prompt'>Prompt</p>
                        <div className='result-block-task-image-replacer'></div>
                        <Button size="medium">Upscale</Button>
                    </div>
                     <div className='result-block-task'>
                        <div className="result-block-task-status">Success</div>
                        <p className='result-block-task-prompt'>Prompt</p>
                        <div className='result-block-task-image-replacer'></div>
                        <Button size="medium">Upscale</Button>
                    </div>
                     <div className='result-block-task'>
                        <div className="result-block-task-status">Success</div>
                        <p className='result-block-task-prompt'>Prompt</p>
                        <div className='result-block-task-image-replacer'></div>
                        <Button size="medium">Upscale</Button>
                    </div>
                     <div className='result-block-task'>
                        <div className="result-block-task-status">Success</div>
                        <p className='result-block-task-prompt'>Prompt</p>
                        <div className='result-block-task-image-replacer'></div>
                        <Button size="medium">Upscale</Button>
                    </div>

                </div>
            </section>
        </div>
    </div>
    )
}

export default Seedance;