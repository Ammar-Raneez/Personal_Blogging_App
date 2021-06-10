import styled from "styled-components"

declare type BlogProps = {
    linkToPost: string;
    bgImage: string;
    postDate: string;
    postAuthor: string;
    title: string;
    content: string;
}

const Blog = ({ linkToPost, bgImage, postDate, postAuthor, title, content} : BlogProps) => {
    return (
        <AnchorContainer href={linkToPost}>
            <div style={{ backgroundImage:  'url(' + bgImage + ')' }}>
                <div style={{ backgroundImage: 'url(' + bgImage + ')' }} />
                <div>
                    <div>{postDate}, {postAuthor}</div>
                    <div>{title}</div>
                    <div>{content}</div>
                </div>
            </div> 
        </AnchorContainer>
    )
}

export default Blog

const AnchorContainer = styled.a `
    @keyframes image {
        100% {
            background-position: 0%;
        }
        50% {
            background-position: 100%;
        }
        0% {
            background-position: 0%;
        }
    }

    text-decoration: none;
    color: black;

    > div {
        display: flex;
        border: 1px solid #0f0;
        border-radius: 8px;
        min-height: 180px;
        overflow: hidden;
        margin-top: 16px;
        background-position: center;
        animation-timing-function: ease;
        animation: image infinite 10s;  

        > * {
            position: relative;
            z-index: 2;
        }

        :hover {
            transform: translate3d(0px, -10px, 0px);
            transform: scale(1.1);
            transition: 1s ease;
            box-shadow: 0 2rem 5rem 0 rgba(0, 0, 0, 0.1);
            cursor: pointer;
            color: black;
            background-position: center;
        }

        :not(hover) {
            transform: translate3d(0px, 0px, 0px);
            transition: 1s ease;
        }

        ::after {
            content: "";    
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(255, 255, 255, 0.6);
        }
    }

    > div > div:first-child {
        flex-basis: 40%;
        background-size: cover;
        background-position: center;
    }

    > div > div:last-child {
        flex-basis: 60%;
        padding: 24px;
        display: flex;
        flex-direction: column;

        > div:first-child {
            font-size: 1em;
            color: #555;
            align-self: flex-end;
        }

        > div:nth-child(2) {
            font-size: 1.8em;
            letter-spacing: 4px;
            margin-top: 12px;
            font-weight: bolder;
        }

        > div:last-child {
            margin-top: 16px;
            line-height: 1.4;
            max-height: 80px;
            overflow: hidden;
        }
    }
`