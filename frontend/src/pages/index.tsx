import type {NextPage} from 'next'
import {BetCard} from "../components/BetCard";

const Home: NextPage = () => {
    const listOdds = [
        {name: "Porto", price: 32},
        {name: "Empate", price: 32},
        {name: "Benfica", price: 22}
    ];
    return (
        <div className='bg-CULTURED w-screen h-screen p-2 flex flex-col gap-3'>
            <BetCard eventName={"Porto - Benfica"} date={"Hoje 20:15"} odds={listOdds}></BetCard>
            <BetCard eventName={"Porto - Benfica"} date={"Hoje 20:15"} odds={listOdds}></BetCard>
            <BetCard eventName={"Porto - Benfica"} date={"Hoje 20:15"} odds={listOdds}></BetCard>
        </div>
    )
}

export default Home
