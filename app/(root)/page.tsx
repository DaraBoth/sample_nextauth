import Link from "next/link";

export default function Home() {
    return (
        <section>
            <div className="text-white">
                <div className="container mx-auto flex flex-col md:flex-row items-center my-12">
                    <div className="flex flex-col  justify-center items-start p-8">
                        <h1 className="text-3xl md:text-5xl  text-yellow-300 tracking-loose">B2B</h1>
                        <h2 className="text-3xl text-slate-700 md:text-5xl leading-relaxed md:leading-snug mb-2">Space : The Timeless Infinity
                        </h2>
                        <p className="text-sm md:text-base text-slate-700 mb-4">Explore your favourite events and
                            register now to showcase your talent and win exciting prizes.</p>
                        <Link href="/"
                            className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
                            Explore Now
                        </Link>
                    </div>
                    <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3 justify-center">
                        <div className="h-48 flex flex-wrap content-center">
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
