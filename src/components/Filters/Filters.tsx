import FilterBlock from "../FilterBlock/FilterBlock";
import type { FilterT } from "../../pages/Questions";
import { useSearchParams } from "react-router";

export default function() {

    const [searchParams, setSearchParams] = useSearchParams();

    const changeFilter = (filterName: keyof FilterT, newValue: string) => {
        if (searchParams.has(filterName)) {
            searchParams.set(filterName, newValue);
        } else {
            searchParams.append(filterName, newValue);
        }
        setSearchParams(searchParams);
    }

    const titleOrDescription = searchParams.get("titleOrDescription") ?? "";

    return(
        <div className='block2'>
            <div className="search">
                <img/>
                <input value={titleOrDescription} placeholder='Введите запрос' onChange={(e) => changeFilter("titleOrDescription", e.target.value)}/>
            </div>
            <FilterBlock name="specializationId" title="Специализация" url="https://api.yeatwork.ru/specializations" onChange={(id: string) => changeFilter("specializationId", id)}/>
            <FilterBlock name="skills" title="Навыки" url="https://api.yeatwork.ru/skills" onChange={(id: string) => changeFilter("skills", id)}/>
            <FilterBlock 
                name="complexity"
                title="Уровень сложности" 
                staticList={[
                    {id: 1, title: "1-3"},
                    {id: 2, title: "4-6"},
                    {id: 3, title: "7-8"},
                    {id: 4, title: "9-10"},
                ]}
                onChange={(id: number) => {
                    let complexities = "";
                    if (id === 1) {
                        complexities = "1,2,3"
                    } else if (id === 2) {
                        complexities = "4,5,6"
                    } else if (id === 3) {
                        complexities = "7,8,9"
                    } else if (id === 4) {
                        complexities = "9,10"
                    }
                    changeFilter("complexity", complexities)
                }}
            />
            <FilterBlock
                name="rate" 
                title="Рейтинг" 
                staticList={[
                    {id: 1, title: "1"},
                    {id: 2, title: "2"},
                    {id: 3, title: "3"},
                    {id: 4, title: "4"},
                    {id: 5, title: "5"},
                ]}
                onChange={(id: string) => changeFilter("rate", id)}
            />
            {/* <FilterBlock 
                name="complexity1"
                title="Статус" 
                staticList={[
                    {id: 1, title: "Изученные"},
                    {id: 2, title: "Не изученные"},
                    {id: 3, title: "Все"},
                ]}
                onChange={(id: string) => changeFilter("complexity1", id)}
            /> */}

            <button onClick={() => setSearchParams({})}>reset</button>
      </div>
    )
}