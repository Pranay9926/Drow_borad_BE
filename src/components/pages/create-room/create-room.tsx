import ShowCanvas from "../../draw-canvas/show-canvas";
import MainHeader from "../header";

const CreateRoom = () => {
    return (
        <main className="h-[100vh] flex flex-col ">
            <div className='h-full'>
                <MainHeader flagForRoom={false} />
                <div className="flex sm:flex-row flex-col bg-slate-50 h-[calc(100vh-82px)]">

                    <ShowCanvas />
                </div>
            </div>
        </main>
    );
}
export default CreateRoom;