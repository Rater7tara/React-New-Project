import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories';
import Features from '../Features/Features';
import TrendingProducts from '../TrendingProducts/TrendingProducts';
import SpecialOffers from '../SpecialOffers/SpecialOffers';
import InstagramFeed from '../InstagramFeed/InstagramFeed';

const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturedCategories />
            <Features />
            <TrendingProducts />
            <SpecialOffers />
            <InstagramFeed />
        </div>
    );
};

export default Home;