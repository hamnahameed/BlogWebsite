import {useNavigate} from 'react-router-dom'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Blogs from '../components/Blogs/Blogs'
import axios from '../axios'
import tech from '../assets/tech.jpg'
import food from "../assets/food.jpg"
import sports from "../assets/sports.jpg"
import health from '../assets/health.jpg'
import travel from '../assets/travel.jpg'
import education from '../assets/education.jpg'
import entertainment from '../assets/entertainment.jpg'
import life from "../assets/life.jpg"
import StatsSection from '../components/StatsSection'
import FeaturedBlogs from '../components/FeaturedBlogs'


const HomePage = ({ isAuthenticated }) => {
  // const [selectedCategory, setSelectedCategory] = useState('All');
  // const [blogs, setBlogs] = useState([]);

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const response = await axios.get('/api/blogs/all_blogs');
  //       setBlogs(response.data);
        
  //     } catch (err) {
  //       console.error('Error fetching blogs:', err);
  //     }
  //   };

  //   fetchBlogs();
  // }, []);

  const navigate = useNavigate();


  const handleCategoryClick = (categoryName) => {
    // setSelectedCategory(categoryName);
    // window.location.hash = '#blogs';
     navigate(`/category/${categoryName}`);
  };
  return (
    <>
   {/* <Categories categories={['All', 'Technology', 'Health', 'Travel', 'Lifestyle', 'Education', 'Food', 'Entertainment', 'Politics', 'Social']} onCategoryClick={handleCategoryClick} /> */}
   <Hero isAuthenticated={isAuthenticated}/>
  <Categories 
    categories={[
      { name: 'Technology', image: tech },
      { name: 'Health', image: health },
      { name: 'Travel', image:travel },
      { name: 'Lifestyle', image: life },
      { name: 'Education', image: education },
      { name: 'Food', image: food },
      { name: 'Entertainment', image:entertainment},
      { name: 'Sports', image: sports },
 
    ]} 
    onCategoryClick={handleCategoryClick} 
  />

   {/* <Blogs blogs={blogs} selectedCategory={selectedCategory} /> */}

    <StatsSection></StatsSection>
    <FeaturedBlogs></FeaturedBlogs>
      
    </>
  )
}

export default HomePage
