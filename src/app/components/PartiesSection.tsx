import React from "react";
import Tag from "./Tag";

interface PartiesSectionProps {
    onlyTags?: boolean;
}

const PartiesSection: React.FC<PartiesSectionProps> = ({onlyTags = false}) => {
    return (
        <div className={`pl-1 pr-1 md:pl-8 md:pr-8 max-[950px]:landscape:mt-0 max-[380px]:mt-6 mt-12 md:mt-14 xl:mt-28 bg-white dark:bg-gray-700 ${onlyTags ? "max-[950px]:landscape:pb-5 pb-10" : ""}`}>
            {!onlyTags && <div
                className="max-[950px]:landscape:hidden flex justify-center items-center dark:bg-gray-700">
                <div className="text-center dark:text-white">
                    <p className="text-sm md:text-md">Use the following acronyms when referring to parties:</p>
                </div>
            </div> }
            <div
                className="max-[950px]:landscape:pt-2 flex justify-center items-center max-[380px]:pt-4 pt-8 dark:bg-gray-700">
                <div className="text-center dark:text-white">
                    <Tag text="SPD" color="red"/> <Tag text="CDU" color="blue"/> <Tag text="FDP"
                                                                                      color="yellow"/> <Tag
                    text="AFD" color="cadetblue"/> <Tag text="BSW" color="orange"/>
                </div>
            </div>
            <div
                className="flex justify-center items-center pt-8 dark:bg-gray-700">
                <div className="text-center dark:text-white">
                    <Tag text="DG" extraText="(Die Grüne)" color="green"/> <Tag text="DL"
                                                                                extraText="(Die Linke)"
                                                                                color="#BE0028"/>
                </div>
            </div>
            {!onlyTags && <div
                className=" max-[950px]:landscape:hidden flex justify-center items-center pt-8 dark:bg-gray-700">
                <div className="text-center dark:text-white">
                    <p className="text-sm text-md">I am still in training, please don’t ask me to compare
                        parties.</p>
                </div>
            </div>}
        </div>
    );
};

export default PartiesSection;
