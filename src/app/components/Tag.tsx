import React from "react";

interface TagProps {
    extraText?: string;
    text: string;
    color?: string;
    onClick?: (text: string) => void; // Update to accept a string argument
}

const Tag: React.FC<TagProps> = ({ text, color = "cadetblue", extraText, onClick }) => {
    return (
        <span
            className="cursor-pointer max-[380px]:px-0 px-1 sm:px-3 py-2 ml-2 border rounded-xl text-black bg-white font-bold text-sm md:text-lg max-[950px]:landscape:text-xs"
            style={{
                boxShadow: `2px 2px 5px ${color}`,
                borderColor: color,
            }}
            onClick={() => onClick?.(text)}
        >
            <span className="max-[380px]:ml-1 ml-2 max-[380px]:mr-1 mr-2">{text}</span>
            {extraText && <span className="font-normal max-[380px]:mr-1 mr-2">{extraText}</span>}
        </span>
    );
};

export default Tag;
