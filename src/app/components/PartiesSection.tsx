import React from "react";
import Tag from "./Tag";
import { useTranslations } from "next-intl";

interface PartiesSectionProps {
    showOnlyTags?: boolean;
    fillChatInput: (text: (previous: string) => string) => void;
}

const PartiesSection: React.FC<PartiesSectionProps> = ({showOnlyTags = false,  fillChatInput}) => {

    const t = useTranslations('Chat');

    const handleTagClick = (party: string) => {
        const text = t("default-tag-input", { party })
        fillChatInput(() => text);
        };

        return (
        <div className={`pl-1 pr-1 md:pl-8 md:pr-8 max-[950px]:landscape:mt-0 max-[380px]:mt-6 mt-12 md:mt-14 xl:mt-28 bg-white dark:bg-gray-700 ${showOnlyTags ? "max-[950px]:landscape:pb-5 pb-10" : ""}`}>
            {!showOnlyTags && <div
                className="max-[950px]:landscape:hidden flex justify-center items-center dark:bg-gray-700">
                <div className="text-center text-black dark:text-white">
                    <p className="text-sm md:text-md">  {t('parties-tags-description')}</p>
                </div>
            </div> }
            <div
                className="max-[950px]:landscape:pt-2 flex justify-center items-center max-[380px]:pt-4 pt-8 dark:bg-gray-700">
                <div className="text-center">
                    <Tag text="SPD" color="red" onClick={handleTagClick}/> <Tag text="CDU" color="blue" onClick={handleTagClick}/> <Tag text="FDP"
                                                                                      color="yellow" onClick={handleTagClick}/> <Tag
                    text="AFD" color="cadetblue" onClick={handleTagClick}/> <Tag text="BSW" color="orange" onClick={handleTagClick}/>
                </div>
            </div>
            <div
                className="flex justify-center items-center pt-8 dark:bg-gray-700">
                <div className="text-center">
                    <Tag text="DG" extraText="(Die Grüne)" color="green" onClick={handleTagClick}/> <Tag text="DL"
                                                                                extraText="(Die Linke)"
                                                                                color="#BE0028" onClick={handleTagClick}/>
                </div>
            </div>
            {!showOnlyTags && <div
                className=" max-[950px]:landscape:hidden flex justify-center items-center pt-8 dark:bg-gray-700">
                <div className="text-center text-black dark:text-white">
                    <p className="text-sm text-md">  {t('parties-tags-disclaimer')}</p>
                </div>
            </div>}
        </div>
    );
};

export default PartiesSection;
