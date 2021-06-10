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
                <div>
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
    }

    > div {
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