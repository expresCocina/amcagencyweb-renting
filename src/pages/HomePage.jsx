import Hero from '../components/Hero';
import Services3D from '../components/Services3D';
import CreditPayment from '../components/CreditPayment';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import ContactForm from '../components/ContactForm';
import SocialProof from '../components/SocialProof';

const HomePage = () => {
    return (
        <>
            <Hero />
            <ContactForm />
            <Services3D />
            <CreditPayment />
            <Testimonials />
            <CTA />
            <SocialProof />
        </>
    );
};

export default HomePage;
