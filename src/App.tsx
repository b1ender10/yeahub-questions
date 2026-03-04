import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Questions from './components/Questions/Questions';
import Filters from './components/Filters/Filters';

export type QuestionT = {
  id: number,
  title: string,
  description: string,
  complexity: number,
  rate: number,
  longAnswer: string,
  imageSrc: string
}

export type FilterT = {
  titleOrDescription: string,
  specializationId: string,
  skills: string,
  complexity: string,
  rate: string,
}

function App() {

  const [questions, setQuestions] = useState<QuestionT[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const limit = 10;

  const fetchQuestion = useCallback((queryString?: string) => {
    console.log(queryString)
    fetch(`https://api.yeatwork.ru/questions/public-questions?page=${currentPage}&limit=${limit}${queryString ? queryString : ""}`)
    .then((res) => res.json())
    .then((res) => {
      setQuestions(res.data);
      setMaxPage(Math.ceil(res.total / limit));
    })
    .finally(() => {
      // setIsLoading(false);
    })
  }, [currentPage, limit])

  useEffect(() => {
    fetchQuestion();
  }, [currentPage, fetchQuestion]);

  const changePage = (newPage: number) => {
    let tempPage = newPage;
    if (newPage <= 0 ) tempPage = 1
    if (newPage > maxPage) tempPage = maxPage

    setCurrentPage(tempPage);
  }

  const [filter, setFilter] = useState<FilterT>({
    titleOrDescription: "", // titleOrDescription
    specializationId: "", // specializationId
    skills: "", // skills
    complexity: "", // complexity
    rate: "", // rate
    // status: ""
  });

  const changeFilter = (filterName: keyof FilterT, newValue: string) => {
    setFilter(prev => {
      const temp = {...prev};
      temp[filterName] = newValue;
      return temp
    })
  }

  const parseFilters = (filter: FilterT) => {
    let queryString = "";
    for (const key in filter) {
      if (filter[key as keyof FilterT]) {
        queryString += `&${key}=${filter[key as keyof FilterT]}`
      }
    }
    return queryString
  }

  useEffect(() => {
    fetchQuestion(parseFilters(filter));
  }, [filter])


  return (
    <div className='main'>
      <Questions questions={questions} changePage={changePage} currentPage={currentPage} maxPage={maxPage} />
      <Filters filter={filter} changeFilter={changeFilter} />
    </div>
  )
}

export default App
