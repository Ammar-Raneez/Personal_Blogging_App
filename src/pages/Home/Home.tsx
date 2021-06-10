import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { selectUser } from "../../features/userSlice"
import instance, { baseURL } from "../../shared/api"
import Footer from "../../shared/Footer"
import Navbar from "../../shared/Navbar"
import Blog from "./Blog"

const Home = () => {
    const [blogData, setBlogData] = useState<any>(null);
    const user = useSelector(selectUser);

    useEffect(() => {
        instance.get('api/models/posts/')
            .then(response => setBlogData(response.data))
    }, [])

    
    return (
        <Container>
            {
                user.email !== '' &&
                    <div className="add-post">
                        <a href="/">
                            <div className="nav-button new-post-buton">+</div>
                        </a>
                    </div>
            }
            <Navbar />

            <header>           
                <div></div>
                <div>Ammar Raneez</div>
                <div><em>~We Were All Beginners At Some Point~</em></div>
            </header>

            {blogData && 
                <div className="blog-container">
                    <div>
                        {blogData.map((blog : any, index : number) => (
                            <Blog
                                key={index}
                                linkToPost={'post.html?id=' + blog.id}
                                bgImage={baseURL + blog.post_image}
                                postDate={new Date(parseInt(blog.added_date)).toDateString()}
                                postAuthor={blog.author}
                                title={blog.title}
                                content={blog.content}
                            />
                        ))}
                    </div>
                </div>
            }
            <Footer />
        </Container>
    )
}

export default Home

const Container = styled.div `
    > header {
        min-height: 16rem;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;

        > div:first-child {
            width: 7rem;
            height: 7rem;
            border-radius: 50%;
            background-image: url(images/main.jpg);
            background-size: cover;
        }

        > div:nth-child(2) {
            font-size: 3em;
            font-weight: bold;
        }

        > div:last-child {
            margin-top: 8px;
        }

        > * {
            z-index: 1;
        }

        ::after {
            content: "";
            position: absolute;
            top: 0; bottom: 0; left: 0; right: 0;
            background-color: rgba(0, 0, 0, 0.6);
        }
    }

    > div.add-post {
        position: fixed;
        background-color: #004186;
        z-index: 1;
        top: 90%;
        left: 95%;
        font-size: 2em;
        border-radius: 50%;
        height: 50px;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease;

        :hover {
            background-color: #002349;
            cursor: pointer;
            transform: translate3d(0, -1px, 0);
        }

        > a {
            color: white;
            text-decoration: none;  
        }
    }

    > div.blog-container {
        margin-top: 32px;
        display: flex;
        justify-content: center;

        > div {
            max-width: 65%;
            min-width: 65%;
            width: 100%;
            padding: 0 16px 0 16px;
        }
    }
`