import abundance from '../assets/images/InfiniteImages/abundance.webp';
import architecture from '../assets/images/InfiniteImages/architecture.webp';
import black from '../assets/images/InfiniteImages/black.webp';
import codedeye from '../assets/images/InfiniteImages/codedeye.webp';
import freedom from '../assets/images/InfiniteImages/freedom.webp';
import founder from '../assets/images/InfiniteImages/founder.webp';
import monster from '../assets/images/InfiniteImages/monster.webp';
import glory from '../assets/images/InfiniteImages/glory.webp';
import kimpachi from '../assets/images/InfiniteImages/kimpachi.webp';
import nostalogia from '../assets/images/InfiniteImages/nostalogia.webp';
import wanted from '../assets/images/InfiniteImages/wanted.webp';
import valentine from '../assets/images/InfiniteImages/valentine.webp';
import travis from '../assets/images/InfiniteImages/travis.webp';
import timeless from '../assets/images/InfiniteImages/timeless.webp';
import hypnotic from '../assets/images/InfiniteImages/hypnotic.webp';
import starlight from '../assets/images/InfiniteImages/starlight.webp';
import outdoor from '../assets/images/InfiniteImages/outdoor.webp';
import starboy from '../assets/images/InfiniteImages/starboy.webp';
import beach1 from '../assets/images/InfiniteImages/beach1.jpg';
import building from '../assets/images/InfiniteImages/building.jpg';
import flower from '../assets/images/InfiniteImages/flower.jpg';
import hard from '../assets/images/InfiniteImages/hard.jpg';
import lake from '../assets/images/InfiniteImages/lake.jpg';
import losted from '../assets/images/InfiniteImages/losted.jpg';
import mountain from '../assets/images/InfiniteImages/mountain.jpg';
import obito from '../assets/images/InfiniteImages/obito.jpg';
import rain from '../assets/images/InfiniteImages/rain.jpg';
import rain1 from '../assets/images/InfiniteImages/rain1.jpg';
import serenity from '../assets/images/InfiniteImages/serenity.jpg';
import React , {createContext , useContext , useState} from 'react'
export const ImageContext = createContext();
export const ImageProvider = ({children})=>{
    const [imageDeta , setImageDeta ] = useState(  [
    { name: 'Abundance', image: abundance, isFull : false },
    { name: 'Architecture', image: architecture , isFull : false},
    { name: 'Black', image: black , isFull : false},
    { name: 'Coded Eye', image: codedeye , isFull : false},
    { name: 'Freedom', image: freedom , isFull : false},
    { name: 'Founder', image: founder , isFull : false},
    { name: 'Monster', image: monster , isFull : false},
    { name: 'Glory', image: glory , isFull : false},
    { name: 'Kimpachi', image: kimpachi, isFull : false },
    { name: 'Nostalgia', image: nostalogia , isFull : false},
    { name: 'Wanted', image: wanted , isFull : false},
    { name: 'Valentine', image: valentine , isFull : false},
    { name: 'Travis', image: travis , isFull : false},
    { name: 'Timeless', image: timeless , isFull : false},
    { name: 'Hypnotic', image: hypnotic, isFull : false },
    { name: 'Starlight', image: starlight, isFull : true },
    { name: 'Outdoor', image: outdoor , isFull : false},
    { name: 'Starboy', image: starboy, isFull : false },
    { name: 'Beach', image: beach1, isFull : false },
    { name: 'Building', image: building, isFull : false },
    { name: 'Flower', image: flower, isFull : false },
    { name: 'Hard', image: hard, isFull : true },
    { name: 'Lake', image: lake, isFull : false },
    { name: 'Losted', image: losted , isFull : true},
    { name: 'Mountain', image: mountain , isFull : true},
    { name: 'Obito', image: obito, isFull : false },
    { name: 'Rain', image: rain , isFull: true },
    { name: 'Rain 1', image: rain1 , isFull: true },
    { name: 'Serenity', image: serenity, isFull : true },
    
  ]
)
    return (
        <ImageContext.Provider value ={{imageDeta}}>
            {children}
        </ImageContext.Provider>
    )
}
export const  useImage = () => useContext(ImageContext)