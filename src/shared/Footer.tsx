import { useEffect, useState } from "react"
import styled from "styled-components"

const Footer = () => {
    const [date, setDate] = useState<number>(0);

    useEffect(() => {
        var date = new Date();
        setDate(date.getFullYear());
    }, [])

    return (
        <Container>
            <p>Copyright &copy; <span>{date}</span> Ammar Raneez ❤️ All Rights Reserved.</p>
        </Container>
    )
}

export default Footer

const Container = styled.footer `
    min-height: 100px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    font-size: 14px;
`