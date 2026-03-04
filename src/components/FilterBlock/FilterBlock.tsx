import { useState, useEffect } from "react";
import "./style.css"

type List = {
  id: string,
  title: string
}

export default function({title, url, staticList, onChange}: {title: string, url?: string, staticList?: List[], onChange: any}) {

    const [list, setList] = useState<List[]>(staticList ? staticList : []);
    const [listTotal, setListTotal] = useState(0);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleClick = (id: string) => {
      setActiveId(id);
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
                    className={el?.id === activeId ? "active" : ""} 
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