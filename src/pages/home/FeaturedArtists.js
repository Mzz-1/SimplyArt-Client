import { useEffect } from "react";
import { Heading2 } from "../../components/Heading";
import { fetchAllArtists } from "../../redux-store/artistSlice";
import { useDispatch, useSelector } from "react-redux";
import { ViewAllButton } from "../../components/Button";
import { Carousel } from "../../components/Carousel";
import { Loader } from "../../components/LoaderWrapper";

export const FeaturedArtists = () => {
    const dispatch = useDispatch();

    const artist  = useSelector((state) => state.artist);

    const { data, fetchStatus } = artist;
    const getArtists = async () => {
        dispatch(fetchAllArtists({ limit: 5, searchItem: "", page: "" }));
    };

    useEffect(() => {
        getArtists();
    }, [dispatch]);

    return (
        <div className="px-[30px] mt-[30px] text-center">
            <Heading2>Meet The Artists</Heading2>
            <br></br>
            <ViewAllButton border="black" link="/artists" align="center">View All</ViewAllButton>
            <br></br>
            <br></br>
            <div className="w-[500px] text-center m-auto">
                {/* <hr className="h-[2.5px] bg-black my-[20px]" /> */}
                
            </div>
            {fetchStatus !== "success" ? (
               <Loader/>
            ) : (
                <Carousel artists={data.artist} />
            )}

          
        </div>
    );
};
