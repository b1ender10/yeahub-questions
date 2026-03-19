import { useState } from "react"
import type { QuestionT } from "../../pages/Questions";
import "./style.css"
import { Link } from "react-router";


export default function({el}: {el: QuestionT}) {

    const [isClose, setIsClose] = useState(true);

    return(
        <div key={el?.id} className='question' onClick={() => setIsClose(prev => !prev)}>
            <div className="title">
                <div className="decorator"></div>
                {el?.title}
                <div className="dropdown" >
                    <img src="./src/assets/dropdown.svg"/>
                </div>
            </div>
            <div className={isClose ? "close" : ""}>
                <div className="info">
                    <div className="info-element">
                        Рейтинг: <span>{el?.rate}</span>
                    </div>
                    <div className="info-element">
                        Сложность: <span>{el?.complexity}</span>
                    </div>
                </div>

                <div className="answer">
                    <img src={el?.imageSrc} />
                    <span dangerouslySetInnerHTML={{__html: el.longAnswer}}></span>

                    <br />
                    <Link to={`/${el?.id}`}>see full</Link>
                </div>
            </div>
        </div>
    )
}