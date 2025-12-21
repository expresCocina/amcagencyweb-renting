import Hero from '../components/Hero';
import ComparisonTable from '../components/ComparisonTable';
import RentingCatalog from '../components/RentingCatalog';
import Services3D from '../components/Services3D';
import RentingFAQ from '../components/RentingFAQ';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import ContactForm from '../components/ContactForm';

const HomePage = () => {
    return (
        <>
            <Hero />
            <ComparisonTable />
            <RentingCatalog />
            <Services3D />
            <Testimonials />
            <RentingFAQ />
            <CTA />
            <ContactForm />
        </>
    );
};

export default HomePage;
