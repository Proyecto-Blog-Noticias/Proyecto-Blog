import "./mainNews.css";
import { Link } from "react-router-dom";
import host from "../../js/host.mjs";

function MainNews ({ id_news, title, date, author, summary, src }) {
   
    return (
        <>
            <div className="mainNewsContainer">
                <Link to={`/news/${id_news}`}>
                    <img className="mainNewsImg" src={host+"imgs/"+src} alt=""/>
                </Link> 
                <div className="mainNewsText">
                    <Link to={`/news/${id_news}`}>
                        <h2 className="mainNewsTitle">{title}</h2>
                    </Link> 
                    <div className="mainNewsAuthorAndDate">
                        <p className="mainNewsAuthor">{author}</p>
                        <p className="mainNewsDate">{date}</p>                    
                    </div>
                    <p className="mainNewsSummary">{summary}</p>  
                </div>    
            </div>
        </>
    )
}

export default MainNews
