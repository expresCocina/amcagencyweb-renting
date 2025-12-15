import Hero from '../components/Hero';
import WhatWeDo from '../components/WhatWeDo';
import Services3D from '../components/Services3D';
import Stats from '../components/Stats';
import ClientLogos from '../components/ClientLogos';
import Certifications from '../components/Certifications';
import WorkProcess from '../components/WorkProcess';
import Awards from '../components/Awards';
import Academy from '../components/Academy';
import CreditPayment from '../components/CreditPayment';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import ContactForm from '../components/ContactForm';
import SocialProof from '../components/SocialProof';
import Integrations from '../components/Integrations';
import BudgetCalculatorCTA from '../components/BudgetCalculatorCTA';

const HomePage = () => {
    return (
        <>
            <Hero />
            <Stats />
            <WhatWeDo />
            <Services3D />
            <ClientLogos />
            <WorkProcess />
            <Certifications />
            <Awards />
            <Academy />
            <CreditPayment />
            <BudgetCalculatorCTA />
            <Testimonials />
            <Integrations />
            <CTA />
            <ContactForm />
            <SocialProof />
        </>
    );
};

export default HomePage;
