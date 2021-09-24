import styled from 'styled-components';

import { AiOutlineComment } from "react-icons/im";
import { useEffect } from 'react';

export default function CommmentButton({post, user}) {

    useEffect(() => {
        
    })
    
    const openCommentsBox = () => {
        const request = sharePost(post.id, user.token);
        request.then(() => { console.log('sucesso') });
        request.catch(() => { console.log('sucesso') });
    }


    return (
        <>
            <CommentIconButton onClick={openCommentsBox} />
            <ShareCounter data-for="main">
                {post.repostCount === 1 ? `${post.repostCount} re-post` : `${post.repostCount || 0} re-posts`}
            </ShareCounter>
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

const ShareCounter = styled.div`
    min-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: default;
    font-size: 11px;
    line-height: 13px;
`;
