import styled from 'styled-components';
import { AiOutlineComment } from "react-icons/ai";

export default function CommmentButton({comments, showComments, setShowComments}) {

    return (
        <>
            <CommentIconButton onClick={() => setShowComments(!showComments)} />
            <CommentsCounter data-for="main">
                {comments.length === 1 ? `${comments.length} comment` : `${comments.length || 0} comments`}
            </CommentsCounter>
        </>
    )
}


const CommentIconButton = styled(AiOutlineComment)`
    font-size: 20px;
    cursor: pointer;
    color: #FFFFFF;
    @media (max-width: 700px) {
        font-size: 17px;
    }
`;

const CommentsCounter = styled.div`
    min-height: 30px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: default;
    font-size: 11px;
    line-height: 13px;
`;
