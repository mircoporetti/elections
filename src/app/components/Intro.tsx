const Intro = () => {
    return (
        <>
            <div className="max-[950px]:landscape:hidden flex justify-center items-center max-[380px]:pt-0 max-[380px]:pb-0 p-3 sm:p-6 dark:bg-gray-700">
                <div className="text-center text-black dark:text-white">
                    <h2 className="font-bold max-[380px]:text-xl text-2xl md:text-3xl">
                        Hallo, I&apos;m Polly Tix
                    </h2>
                </div>
            </div>
            <div className="max-[950px]:landscape:hidden flex justify-center items-center max-[380px]:pt-1 pt-2 sm:pt-2 md:pt-8 lg:pt-1 xl:pt-4 dark:bg-gray-700">
                <div className="text-center text-black dark:text-white">
                    <p className="text-md">
                        Here to help you with the upcoming German elections of February 2025
                    </p>
                </div>
            </div>
            <div className="max-[950px]:landscape:hidden flex justify-center items-center dark:bg-gray-700 rounded-2xl">
                <div className="text-center">
                    <p className="max-[380px]:text-4xl text-5xl">🇩🇪</p>
                </div>
            </div>
            <div className="max-[950px]:landscape:hidden flex justify-center items-center dark:bg-gray-700">
                <div className="text-center text-black dark:text-white">
                    <p className="text-md">
                        How? I am an AI trained with the German parties’ official electoral programs 2025
                    </p>
                </div>
            </div>
        </>
    );
};

export default Intro;