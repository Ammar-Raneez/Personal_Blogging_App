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
        <a className='linkToPost' href={linkToPost}>
            <div className="post" style={{ backgroundImage:  'url(' + bgImage + ')' }}>
                <div className="post-image" style={{ backgroundImage: 'url(' + bgImage + ')' }} />
                <div className="post-content">
                    <div className="post-date">{postDate}, {postAuthor}</div>
                    <div className="post-title">{title}</div>
                    <div className="post-text">{content}</div>
                </div>
            </div> 
        </a>
    )
}

export default Blog
