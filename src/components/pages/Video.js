import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/api/apiSlice";
// import VideoLoader from "../ui/loaders/VideoLoader";
import RelatedVideoLoader from "../ui/loaders/RelatedVideoLoader"
import PlayerLoader from "../ui/loaders/PlayerLoader"
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import Error from "../ui/Error";

export default function Video() {
    const { videoId } = useParams();
    const { data: video, isLoading, isError } = useGetVideoQuery(videoId);

    let content = null;

    if (isLoading) {
        content = <>
            <PlayerLoader />
        </>
    }
    else if (!isLoading && isError) {
        content = <Error message='There was an error' />
    }
    else if (!isLoading && !isError && video?.id) {
        content = <>
            <Player link={video.link} title={video.title} />
            <Description id={video.id} title={video.title} date={video.date} description={video.description} />
        </>
    }

    return (
        <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
            <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
                <div className="grid grid-cols-3 gap-2 lg:gap-8">
                    <div className="col-span-full w-full space-y-8 lg:col-span-2">
                        {content}
                    </div>
                    {isLoading ?
                        <>
                            <RelatedVideoLoader />
                            <RelatedVideoLoader />
                            <RelatedVideoLoader />
                        </>
                        : video?.id ?
                            <RelatedVideos id={video.id} title={video.title} />
                            : <Error message='No videos found' />
                    }
                </div>
            </div>
        </section>
    );
}
