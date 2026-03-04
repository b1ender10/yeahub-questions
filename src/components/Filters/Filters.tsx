import FilterBlock from "../FilterBlock/FilterBlock";
import type { FilterT } from "../../App";

export default function({filter, changeFilter}: {filter: FilterT, changeFilter: (filterName: keyof FilterT, newValue: string) => void}) {

    return(
        <div className='block2'>
            <div className="search">
                <img/>
                <input value={filter?.titleOrDescription} placeholder='Введите запрос' onChange={(e) => changeFilter("titleOrDescription", e.target.value)}/>
            </div>

            <FilterBlock title="Специализация" url="https://api.yeatwork.ru/specializations" onChange={(id: string) => changeFilter("specializationId", id)}/>
            <FilterBlock title="Навыки" url="https://api.yeatwork.ru/skills" onChange={(id: string) => changeFilter("skills", id)}/>
            <FilterBlock 
                title="Уровень сложности" 
                staticList={[
                    {id: "1", title: "1-3"},
                    {id: "2", title: "4-6"},
                    {id: "3", title: "7-8"},
                    {id: "4", title: "9-10"},
                ]}
                onChange={(id: string) => {
                    let complexities = "";
                    if (id === "1") {
                    complexities = "1,2,3"
                    } else if (id === "2") {
                    complexities = "4,5,6"
                    } else if (id === "3") {
                    complexities = "7,8,9"
                    } else if (id === "4") {
                    complexities = "9,10"
                    }
                    changeFilter("complexity", complexities)
                }}
            />
            <FilterBlock 
                title="Рейтинг" 
                staticList={[
                    {id: "1", title: "1"},
                    {id: "2", title: "2"},
                    {id: "3", title: "3"},
                    {id: "4", title: "4"},
                    {id: "5", title: "5"},
                ]}
                onChange={(id: string) => changeFilter("rate", id)}
                />
                <FilterBlock 
                title="Статус" 
                staticList={[
                    {id: "1", title: "Изученные"},
                    {id: "2", title: "Не изученные"},
                    {id: "3", title: "Все"},
                ]}
                onChange={(id: string) => changeFilter("complexity", id)}
            />
      </div>
    )
}