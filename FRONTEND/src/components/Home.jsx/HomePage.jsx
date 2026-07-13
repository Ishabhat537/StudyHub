import React from 'react';
import HeroSection from './HeroSection';
import StudyHub from './StudyHub';
import Navbar from '../Navbar';
import SemesterSection from './SemesterSection';
import SubjectSection from './SubjectSection';
import CategorySection from './CategorySection';
import Testinomals from './Testinomals';
function HomePage() {
    return ( <><div>
        
        <HeroSection/>
        <SemesterSection/>
        <SubjectSection/>
        <CategorySection/>
        <StudyHub/>
        <Testinomals/>

        </div></> );
}

export default HomePage;