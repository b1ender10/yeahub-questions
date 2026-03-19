import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router';

function Question() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [question, setQuestion] = useState<{
        title: string,
        longAnswer: string,
        complexity: number,
        questionSkills: Array<{
            id: number,
            title: string
        }>
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://api.yeatwork.ru/questions/public-questions/${id}`);
                if (!res?.ok) {
                    navigate(-1);
                    return;
                }
                const resJson = await res.json();
                console.log(resJson);
                setQuestion(resJson);
            } catch(e) {
                console.error(e);
                navigate(-1);
            }
        }
        fetchData();
    }, [])

    

    return(
        <>
            <div>
                question {id}
                <div>{question?.title}</div>
                <div dangerouslySetInnerHTML={{__html: question?.longAnswer ?? ""}}></div>
                <button onClick={() => navigate(-1)}>back</button>
            </div>
            <div>
                <div>complexity: {question?.complexity}</div>
                <div>skills: {question?.questionSkills?.map(skill => <span key={skill?.id}>{skill?.title}</span>)}</div>
            </div>
            
        </>
    )
}

export default Question;