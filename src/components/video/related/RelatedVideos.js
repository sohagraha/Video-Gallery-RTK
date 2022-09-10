import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import RelatedVideo from "./RelatedVideo";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import Error from "../../ui/Error";

export default function RelatedVideos({ id, title }) {
    const { data: videos, isLoading, isError } = useGetRelatedVideosQuery({ videoId: id, videoTitle: title });

    let content = null;
    if (isLoading) {
        content = <>
            <RelatedVideoLoader />
            <RelatedVideoLoader />
            <RelatedVideoLoader />
            <RelatedVideoLoader />
        </>
    }
    else if (!isLoading && isError) {
        content = <Error message='There was an error' />
    }
    else if (!isLoading && !isError && videos?.length) {
        content = videos.map(video => <RelatedVideo key={video.id} video={video} />)
    }
    else if (!isLoading && !isError && videos?.length === 0) {
        content = <Error message='No videos found' />
    }

    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {
                content
            }
        </div>
    );
}
