export const generateVideo = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
        id: crypto.randomUUID(),
        status: "success",
        videoUrl: "./success_url"
    }
}