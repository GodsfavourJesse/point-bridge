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

const MainLayout = ({ username }) => {
    return (
        <main className="flex-1 space-y-6 overflow-y-auto">
            <div className="relative mb-24 w-full">
                <Hero />

                <div className="absolute bottom-[-80px] w-full flex flex-col items-center justify-center gap-4 md:flex-row md:gap-10">
                    <div className="block md:hidden">
                        <CurrentBalanceCard />
                    </div>
                    <div className="hidden md:flex gap-10">
                        <CurrentBalanceCard />
                        <ReferralBalanceCard />
                    </div>
                </div>
            </div>
            <div className="px-4 md:px-6 space-y-6 pt-24 md:pt-0">
                <GreetingsCard username={username} />
                <ReferralLinkCard />
                <TaskCard />
                <InfoCard />
                <SocialCard />
            </div>
        </main>
    );
};

export default MainLayout;
