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
                <div className="profile-image"></div>
                <div className="profile-name">Ammar Raneez</div>
                <div className="sub-text"><em>~We Were All Beginners At Some Point~</em></div>
            </header>

            {blogData && 
                <div className="main">
                    <div className="main-container">
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
`