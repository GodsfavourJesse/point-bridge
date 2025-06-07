import React from "react";
// components/dashboard/MainLayout.jsx
import ReferralLinkCard from './ReferralLinkCard';
import CurrentBalanceCard from './CurrentBalanceCard';
import ReferralBalanceCard from './ReferralBalanceCard';
import SocialCard from './SocialCard';
import Footer from '../../components/Footer';
import GreetingsCard from "./GreetingsCard";
import TaskCard from "../../components/TaskCard";
import InfoCard from "./InfoCad";
import Hero from "./Hero";

const MainLayout = ({ username = "JazzDRUM" }) => {
    return (
        <main className="flex-1 space-y-6 overflow-y-auto">
            <div className="relative mb-50">
                <Hero />

                <div className="absolute bottom-[-80px] flex items-center justify-center gap-10 w-full h-55">
                    <CurrentBalanceCard />
                    <ReferralBalanceCard />
                </div>
            </div>
            <GreetingsCard username={username} />
            <ReferralLinkCard />
            <TaskCard />
            <InfoCard />
            <SocialCard />
            <Footer />
        </main>
    );
};

export default MainLayout;
