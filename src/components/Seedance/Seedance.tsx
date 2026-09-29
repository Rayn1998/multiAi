import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler} from 'react-hook-form';

import { generateVideo } from '../../services/seedance';

import { getCurrentWindow } from '@tauri-apps/api/window';

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
    const [results, setResults] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [onHover, setOnHover] = useState<boolean>(false);

    const { register, handleSubmit, reset } = useForm<Inputs>();

    useEffect(() => {
        let unlisten: (() => void) | undefined;
        async function setup() {
            const window = getCurrentWindow();

            unlisten = await window.onDragDropEvent((event) => {
                console.log('TAURI DROP EVENT:', event);
            });
        }

        setup();

        return () => {
            unlisten?.();
        };
    }, [])
    
    const handleChangeMode = (event: any) => {
        setMode(event.target.value)
    }

    const handleChangeAspect = (event: any) => {
        setAspect(event.target.value)
    }

    const handleChangeResolution = (event: any) => {
        setResolution(event.target.value)
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);

        await generateVideo(data);
        setIsLoading(false);
        setResults(prev => [...prev, 0]);
        reset();
    }

    const handleDrop = (event: React.DragEvent<HTMLInputElement>) => {
        console.log(event)
    }

    return (
    <div className="model">
        <div className="main-area">
            <form onSubmit={handleSubmit(onSubmit)} className="input-block">
                <h1 className="model-title">Seedance model</h1>
                <div className="input-mode">
                    <p>select mode</p>
                    <select
                        {...register("mode")}
                        value={mode}
                        onChange={handleChangeMode}
                        >
                        {modes.map((mode, i) => {
                            return <option key={i} value={mode}>{mode}</option>
                        })}
                    </select>
                </div>
                <div 
                    className="input-reference-images"
                    style={{backgroundColor: onHover ? "red" : "green"}}
                    onDrop={() => setOnHover(true)}
                >
                    <p>Reference images (optional)</p>
                    <input {...register("referenceImages")} type="file" accept="image/*, video/*" onDropCapture={handleDrop} className="input-reference-images-dropzone" />
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
                     <select
                        {...register("aspect")}
                        value={aspect}
                        onChange={handleChangeAspect}
                        >
                        {aspects.map((aspect, i) => {
                            return <option key={i} value={aspect}>{aspect}</option>
                        })}
                    </select>
                </div>
                <div className="input-duration">
                    <p>Duration (seconds)</p>
                    {/* <Slider {...register("duration")} defaultValue={50} step={1} min={1} marks max={15} aria-label="Default" valueLabelDisplay="auto" /> */}
                </div>
                <div className='input-resolution'>
                    <p>Resolution</p>
                    <select
                        {...register("resolution")}
                        value={resolution}
                        onChange={handleChangeResolution}
                        >
                        {resolutions.map((resolution, i) => {
                            return <option key={i} value={resolution}>{resolution}</option>
                        })}
                    </select>
                </div>
                <button type="submit">Generate</button>
            </form>
            <section className="result-block">
                <div className="result-block-title">
                    <p>Your results</p>
                    <p>View and manage your generation tasks</p>
                </div>
                <div className='result-block-list'>
                    {isLoading && <div className='loader'></div>}
                    {results && results.map((_, i) => {
                        return <div key={i} className='result-block-task'>
                        <div className="result-block-task-status">Success</div>
                        <p className='result-block-task-prompt'>Prompt</p>
                        <div className='result-block-task-image-replacer'></div>
                        <button>Upscale</button>
                    </div>})}
                </div>
            </section>
        </div>
    </div>
    )
}

export default Seedance;