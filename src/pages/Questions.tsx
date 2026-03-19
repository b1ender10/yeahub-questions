import { useCallback, useEffect, useState } from 'react'
import QuestionsList from '../components/QuestionsList/QuestionsList';
import Filters from '../components/Filters/Filters';
import { useSearchParams } from 'react-router';

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

function Questions() {

    const [questions, setQuestions] = useState<QuestionT[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const limit = 10;

    const fetchQuestion = useCallback((queryString?: string) => {
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

    const [searchParams, setSearchParams] = useSearchParams();

    const parseFilters = (filter: URLSearchParams) => {
        return filter.toString();
    }

    useEffect(() => {
        fetchQuestion(parseFilters(searchParams));
    }, [searchParams])

    return(
        <>
            <QuestionsList questions={questions} changePage={changePage} currentPage={currentPage} maxPage={maxPage} />
            <Filters  />
        </>
    )
}

export default Questions;