import Hero from '../components/Hero';
import WhatWeDo from '../components/WhatWeDo';
import Services from '../components/Services';
import Academy from '../components/Academy';
import CreditPayment from '../components/CreditPayment';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import ContactForm from '../components/ContactForm';

const HomePage = () => {
    return (
        <>
            <Hero />
            <WhatWeDo />
            <Services />
            <Academy />
            <CreditPayment />
            <Testimonials />
            <CTA />
            <ContactForm />
        </>
    );
};

export default HomePage;
