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
        <div className={`pl-1 pr-1 md:pl-8 md:pr-8 max-[950px]:landscape:mt-0 max-[380px]:mt-6 bg-white dark:bg-gray-700 ${showOnlyTags ? "max-[950px]:landscape:pb-5 pb-6" : ""}`}>
            {!showOnlyTags && <div
                className="max-[950px]:landscape:hidden flex justify-center items-center dark:bg-gray-700">
                <div className="text-center text-black dark:text-white">
                    <p className="text-sm md:text-md">  {t('parties-tags-description')}</p>
                </div>
            </div> }
            <div
                className="max-[950px]:landscape:pt-6 flex justify-center items-center max-[380px]:pt-4 pt-8 dark:bg-gray-700">
                <div className="text-center">
                    <Tag text="SPD" color="#D02323" onClick={handleTagClick}/> <Tag text="CDU" color="#000000" onClick={handleTagClick}/> <Tag text="FDP"
                                                                                      color="#FFED00" onClick={handleTagClick}/> <Tag
                    text="AFD" color="#009EE0" onClick={handleTagClick}/> <Tag text="BSW" color="#FFD700" onClick={handleTagClick}/>
                </div>
            </div>
            <div
                className="flex justify-center items-center pt-8 dark:bg-gray-700">
                <div className="text-center">
                    <Tag text="DG" extraText="(Die Grüne)" color="#64A12D" onClick={handleTagClick}/> <Tag text="DL"
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
