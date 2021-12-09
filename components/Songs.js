import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playlistAtom"
import Song from "./Song";

function Songs() {
    const playlist = useRecoilValue(playlistState);
    return (
        <div className="p-8 flex flex-col space-y-1 pb-28 text-white">
            {playlist?.tracks.items.map((item, i) => (
                <Song key={item.track.id} track={item.track} order={i} />
            ))}
        </div>
    )
}

export default Songs
