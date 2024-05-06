import FileUpload from "./FileUpload";
export default function AudioFileUpload({
  onAudioFileUpload,
}: {
  readonly onAudioFileUpload: (audioUrl: string, duration: number) => void;
}) {
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      async () => {
        const audioUrl = reader.result as string;
        const duration = await getAudioDuration(audioUrl);
        onAudioFileUpload(audioUrl, Math.round(duration ?? 0));
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label htmlFor="">Fichier audio</label>
      <FileUpload onFileUpload={handleFileUpload} accept="audio/*" />
    </div>
  );
}

const getAudioDuration = async (audioUrl: string): Promise<number | null> => {
  try {
    const audio = new Audio(audioUrl);

    // Wait for the audio metadata to load
    return new Promise((resolve) => {
      audio.addEventListener("loadedmetadata", () => {
        const audioDuration = audio.duration;
        resolve(audioDuration);
      });

      // Preload the audio to get the metadata (duration)
      audio.preload = "metadata";
      audio.load();
    });
  } catch (error) {
    console.error("Error fetching audio duration:", error);
    return null;
  }
};
