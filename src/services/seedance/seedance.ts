import { readFile } from "@tauri-apps/plugin-fs";

export const generateVideo = async (_params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
        id: crypto.randomUUID(),
        status: "success",
        videoUrl: "./success_url"
    }
}

export const createPreviewURL = async (path: string, mimetype: string): Promise<string> => {
    const bytes = await readFile(path);
    const blob = new Blob([bytes], {type: mimetype});
    return URL.createObjectURL(blob);
}