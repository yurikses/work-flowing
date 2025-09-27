'use client';
export default function AsidePanel(){

    const pages = [
        {id:1, name: "Home", href: "/home"},
        {id:2, name: "About", href: "/about"},
    ]

    const panels = [
        [{
        name: "Home", href: "/home",
        }]
    ]


    return (
        <div className="absolute top-0 left-0 min-h-screen w-[15vw] bg-(--second-bg-color) rounded-xl m-2 ">

            {pages.map((elem)=>{
                return (<div>
                    {elem.name}
                </div>)
            })}
        </div>
    )
}