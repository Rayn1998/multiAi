import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

// COMPONENTS
import SelectMenu from "@/components/SelectMenu/SelectMenu";

// SERVICES
import { generateVideo, createPreviewURL } from "@/services/seedance/seedance";

// TAURI
import { getCurrentWindow } from "@tauri-apps/api/window";

type Inputs = {
  mode: string;
  referenceImages?: string;
  referenceVideos?: string;
  prompt: string;
  aspect: string;
  duration: string;
  resolution: string;
};

const modes = [
  "Seedance 2.5 video",
  "Seedance 2.0 video",
  "Seedance 2.0 image",
];
const aspects = ["16:9", "4:3", "21:9", "9:16"];
const resolutions = ["360p", "480p", "720p", "1080p"];

const Seedance = () => {
  const [mode, setMode] = useState<string>(modes[0]);
  const [aspect, setAspect] = useState<string>(aspects[0]);
  const [resolution, setResolution] = useState<string>(resolutions[0]);
  const [valueSeconds, setValueSeconds] = useState<number>(5);

  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [referenceVideos, setReferenceVideos] = useState<string[]>([]);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    let unlisten: () => void;
    async function setup() {
      const window = getCurrentWindow();

      unlisten = await window.onDragDropEvent(async (event) => {
        if (event.payload.type === "drop") {
          const path = event.payload.paths[0];
          const ext = path.split("/").at(-1)!.split(".").at(-1)!;
          if (["jpeg", "jpg", "png"].includes(ext)) {
            const imagePath = await createPreviewURL(path, "image/jpeg");
            setReferenceImages((prev) => [...prev, imagePath]);
          }

          if (["mp4", "mov"].includes(ext)) {
            const videoPath = await createPreviewURL(path, "video/mp4");
            setReferenceVideos((prev) => [...prev, videoPath]);
          }
        }
      });
    }

    setup();

    return () => {
      unlisten?.();
    };
  }, []);

  const handleDeleteImage = (image: string) => {
    setReferenceImages((prev) => {
      return prev.filter((img) => img !== image);
    });
  };

  const handleDeleteVideo = (video: string) => {
    setReferenceVideos((prev) => {
      return prev.filter((vid) => vid !== video);
    });
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // setIsLoading(true);

    console.log(data);
    await generateVideo(data);
    // setIsLoading(false);
    // setResults((prev) => [data, ...prev]);
    setReferenceImages([]);
    setReferenceVideos([]);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="seedance-form">
      <h1 className="model-title">Seedance model</h1>
      <div className="input-mode">
        <p>Select mode</p>
        <SelectMenu
          {...register("mode")}
          value={mode}
          onChange={(event) => setMode(event.target.value)}
          options={modes}
        />
      </div>
      <div className="input-reference-images">
        <p>Reference images (optional)</p>
        <div className="input-reference-media-container">
          {referenceImages &&
            referenceImages.map((image) => {
              return (
                <div className="input-media-block">
                  <div
                    className="input-media-x"
                    onClick={() => handleDeleteImage(image)}
                  >
                    X
                  </div>
                  <img className="input-media-image" src={image} key={image} />
                </div>
              );
            })}
        </div>
        <p>{referenceImages.length}/9</p>
      </div>
      <div className="input-reference-videos">
        <p>Reference video (optional)</p>
        <div className="input-reference-media-container">
          {referenceVideos &&
            referenceVideos.map((video) => {
              return (
                <div className="input-media-block">
                  <div
                    className="input-media-x"
                    onClick={() => handleDeleteVideo(video)}
                  >
                    X
                  </div>
                  <video
                    className="input-media-video"
                    src={video}
                    key={video}
                    controls
                  />
                </div>
              );
            })}
        </div>
        <p>{referenceVideos.length}/3</p>
      </div>
      <div className="prompt-block">
        <h2>Prompt</h2>
        <textarea
          className="prompt-block-textarea"
          {...register("prompt", { required: true })}
        ></textarea>
        <p>Describe the video you want to generate</p>
      </div>
      <div className="input-aspect-ratio">
        <h2>Aspect ratio</h2>
        <SelectMenu
          {...register("aspect")}
          value={aspect}
          onChange={(event) => setAspect(event.target.value)}
          options={aspects}
        />
      </div>
      <div className="input-duration">
        <h2>Duration (seconds)</h2>
        <input
          {...register("duration")}
          className="input-slider"
          type="range"
          value={valueSeconds}
          onChange={(e) => setValueSeconds(+e.target.value)}
          step={1}
          min={1}
          max={15}
        />
        <p>{valueSeconds}</p>
      </div>
      <div className="input-resolution">
        <h2>Resolution</h2>
        <SelectMenu
          {...register("resolution")}
          value={resolution}
          onChange={(event) => setResolution(event.target.value)}
          options={resolutions}
        />
      </div>
      <button className="submit-button" type="submit">
        Generate
      </button>
    </form>
  );
};

export default Seedance;
