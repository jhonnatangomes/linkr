import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";

const EditButton = ({ isEditing, setIsEditing, setEditText, postText, editPostRequest}) => {
    const toggleIsEditing = () => {

        if (isEditing) {
            editPostRequest();
        } else {
            setEditText(postText)
        }

        setIsEditing(!isEditing);

    }

    return (
        <EditIcon onClick={toggleIsEditing} />
    );
}

const EditIcon = styled(FiEdit2)`
    color: #FFFFFF;
    font-size: 14px;
    cursor: pointer;
`;

export default EditButton;