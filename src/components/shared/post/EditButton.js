import styled from "styled-components";
import { ReactComponent as EditSvg } from '../../../assets/icons/edit.svg';

const EditButton = ({ isEditing, setIsEditing, editText, setEditText, postText, editPostRequest, setIsEditLoading}) => {
    const toggleIsEditing = () => {
        if (isEditing) {
            if (editText === postText) {
                setIsEditLoading(false);
                setIsEditing(false);
            } else {
                setIsEditLoading(true);
                editPostRequest();
            }
        } else {
            setEditText(postText)
            setIsEditing(true);
        }
    }

    return (
        <EditIcon onClick={toggleIsEditing} />
    );
}

const EditIcon = styled(EditSvg)`
    color: #FFFFFF;
    font-size: 20px;
    cursor: pointer;
`;

export default EditButton;