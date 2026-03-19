import { useState } from "react";
import Question from "../Question/Question"
import type { QuestionT } from "../../pages/Questions";


export default function({questions, changePage, currentPage, maxPage}: {questions: QuestionT[], changePage: (page: number) => void, currentPage: number, maxPage: number}) {

    const [goToPage, setGoToPage] = useState(0);

    return(
        <div className='block1'>
          <div className='title'>
            Вопросы React, JavaScript
          </div>

          <div className='questions'>
            {questions.map((el) => {
              return(
                <Question key={el?.id} el={el}/>
              )
            })}
          </div>

          <div className='pagination'>
            <button onClick={() => changePage(currentPage - 1)}>prev</button>
            <button onClick={() => changePage(currentPage + 1)}>next</button>
            current page : {currentPage}
            <br/>
            go to page <input value={goToPage} onChange={e => setGoToPage(Number(e.target.value))}/> / {maxPage} <button onClick={() => changePage(goToPage)}>go</button>
          </div>
      </div>
    )
}