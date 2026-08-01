import VideoCallRoom from "@/components/modules/VideoCall/VideoCallRoom";

interface VideoCallPageProps {
  params: Promise<{ videoCallingId: string }>;
}

const VideoCallPage = async ({ params }: VideoCallPageProps) => {
  const { videoCallingId } = await params;

  return <VideoCallRoom videoCallingId={videoCallingId} />;
};

export default VideoCallPage;
