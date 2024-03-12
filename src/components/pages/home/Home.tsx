import ShowCanvas from "../../draw-canvas/show-canvas";
import MainHeader from "../header";

const Home = () => {
    return (
        <main className="h-[100vh] flex flex-col ">
            <div className='h-full'>
                <MainHeader flagForRoom={true} />
                <div className="flex sm:flex-row flex-col bg-slate-50 h-[calc(100vh-82px)]">
                    <section className="w-[60%] flex flex-col items-start justify-center p-32">
                        <h1 className="text-5xl font-semibold text-slate-900 mb-7">Design anything, anywhere.</h1>
                        <p className="text-lg font-normal text-slate-800 leading-8 tracking-[1px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime nihil iure ab perferendis, harum consectetur dolore provident rerum est minima obcaecati, ducimus possimus animi saepe vero! Aut modi voluptatum eligendi!</p>
                        <button className="px-6 py-3 rounded-full border border-slate-700 text-lg mt-8">
                            Learn more
                        </button>
                    </section>
                    <ShowCanvas />
                </div>
            </div>
        </main>
    );
}

export default Home;