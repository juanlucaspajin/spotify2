import { ChevronDownIcon, LogoutIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { shuffle } from "lodash";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
];

function Center() {
    const { data: session, status } = useSession()
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null)
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState)
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistId]);

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body)
        })
        .catch(error => console.log('Something went wrong!', error))
    },[spotifyApi,playlistId]);

    const showMenuOnClick = () => { setShowMenu(!showMenu) }

    const RenderedSubmenu = () => {
        return (
            <div className="rounded-lg border-white bg-white text-black mt-2 p-5">
                <div>
                    <button className="flex items-center space-x-2 hover:text-gray-800" onClick={() => signOut()}>
                        <LogoutIcon className="h-5 w-5"/>
                        <p>Logout</p>
                    </button>
                </div>
            </div>
        );
    }

    console.log(showMenu);
    return (
        <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2" onClick={showMenuOnClick}>
                    <img className="rounded-full w-10 h-10" src={session?.user.image} alt="profile-pic" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5"/>
                </div>

                {showMenu ? <RenderedSubmenu /> : null}
            </header>

             <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                 <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0]?.url} alt="" />
                 <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h1>
                 </div>
             </section>

             <div>
                 <Songs />
             </div>
        </div>
    )
}

export default Center
