import styled from "styled-components";
import { useEffect, useRef } from "react";

const EditInput = ({ editPostRequest, isEditLoading, setIsEditLoading, isEditing, setIsEditing, editText, setEditText }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (!isEditing) {
                setEditText('');
                inputRef.current.focus();
                setEditText(editText);
            }
        }, 1)
    }, [isEditing]);

    const checkKey = (e) => {
        if (isEditLoading) {
            e.preventDefault();
            return;
        }
        const key = e.key;

        if (key === "Enter") {
            e.preventDefault();
            setIsEditLoading(true);
            editPostRequest();
        }

        if (key === "Escape") {
            e.preventDefault();
            setIsEditLoading(false);
            setIsEditing(false);
        }
    }

    return (
        <TextArea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            ref={inputRef}
            onKeyDown={checkKey}
            disabled={isEditLoading}
            maxLength={50000}
        />
    );
}

const TextArea = styled.textarea`
    width: 100%;
    background: #FFFFFF;
    border-radius: 7px;
    border: none;
    outline: none;
    margin-bottom: 5px;
    padding-left: 13px;
    font-size: 15px;
    line-height: 18px;
    padding: 8px 13px;
    resize: none;
    min-height: 66px;
`;

export default EditInput;