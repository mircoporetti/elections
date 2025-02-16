import {useTranslations} from 'next-intl';
import React from "react";

const Intro = () => {
    const t = useTranslations('Chat');

    return (
        <>
            <div
                className="max-[950px]:landscape:hidden flex justify-center items-center max-[380px]:pt-0 max-[380px]:pb-0 pb-2 sm:p-6 dark:bg-gray-700">
                <div className="text-center text-black dark:text-white">
                    <h2 className="font-bold max-[380px]:text-xl text-2xl md:text-3xl">
                        {t('greetings')}
                    </h2>
                </div>
            </div>
            <div
                className="max-[950px]:landscape:hidden flex justify-center items-center max-[380px]:pt-1 pt-2 sm:pt-2 md:pt-8 lg:pt-1 xl:pt-4 dark:bg-gray-700 mt-1">
                <div className="text-center text-black dark:text-white">
                    <p className="text-md">
                        {t('intro1')}
                    </p>
                </div>
            </div>
            <div
                className="max-[950px]:landscape:hidden flex justify-center items-center dark:bg-gray-700 rounded-2xl mt-2 mb-2 sm:mt-4 sm:mb-4">
                <div className="text-center">
                    <p className="max-[380px]:text-2xl text-4xl sm:text-5xl">🇩🇪</p>
                </div>
            </div>
            <div className="max-[950px]:landscape:hidden flex justify-center items-center dark:bg-gray-700">
                <div className="text-center text-black dark:text-white">
                    <p className="text-md">
                        {t('intro2')}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Intro;