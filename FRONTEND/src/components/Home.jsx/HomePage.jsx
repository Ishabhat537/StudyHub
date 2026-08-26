import HeroSection from './HeroSection';
import SemesterSection from './SemesterSection';
import SubjectSection from './SubjectSection';
import CategorySection from './CategorySection';
import Testinomals from './Testinomals';
import StudyHub from './StudyHub';
import '../../styles/home.css';
function HomePage() {
    return ( <main className="home-page">
        <HeroSection/>
        <SemesterSection/>
        <SubjectSection/>
        <CategorySection/>
        <StudyHub/>
        <Testinomals/>
    </main> );
}

export default HomePage;