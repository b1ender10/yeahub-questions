import { useState, useEffect } from "react";
import "./style.css"
import { useSearchParams } from "react-router";

type List = {
  id: number,
  title: string
}

export default function({title, url, staticList, onChange, name}: {title: string, url?: string, staticList?: List[], onChange: any, name: string}) {

    const [list, setList] = useState<List[]>(staticList ? staticList : []);
    const [listTotal, setListTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentValue = searchParams.get(name) ?? "";


    useEffect(() => {
      if(staticList) return 
      setIsLoading(true);
      fetch(`${url}?page=1&limit=10`)
          .then((res) => res.json())
          .then((res) => {
            setList(res.data);
            setListTotal(res.total);
          })
          .finally(() => {
            setIsLoading(false);
          })
    }, [])

    const handleClick = (id: number) => {
      onChange(id);
    }

    const loadAll = () => {
      if(staticList) return 
      setIsLoading(true);
      fetch(`${url}?page=1&limit=${listTotal}`)
          .then((res) => res.json())
          .then((res) => {
            setList(res.data);
            setListTotal(res.total);
          })
          .finally(() => {
            setIsLoading(false);
          })
    }

    return(
        <div className='block speacializations'>
          <div className="title">{title}</div>
          <div className="list">
            { 
              isLoading ? 
              "Loading..." :
              list.map(el => {
                return(
                  <div 
                    className={el?.id === Number(currentValue) ? "active" : ""} 
                    key={el?.id} 
                    onClick={() => handleClick(el?.id)}
                  >
                    {el?.title}
                  </div>
                )
              })
            }
          </div>
          { !staticList && <button className='more' onClick={loadAll}>Посмотреть все</button>}
        </div>
    )
}