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
            <div className="relative mb-2 w-full flex flex-col gap-10 min-h-[350px] p-10 px-7 md:px-18 bg-gradient-to-br from-indigo-600 to-blue-500 overflow-hidden">
                <Hero />

                <div className="w-full flex flex-col gap-4 md:flex-row md:gap-10">
                    <div className="block md:hidden">
                        <CurrentBalanceCard />
                    </div>
                    <div className="hidden md:flex gap-10 h-40">
                        <CurrentBalanceCard />
                        <ReferralBalanceCard />
                    </div>
                </div>
            </div>
            <div className="px-4 md:px-6 space-y-6 pt-1 md:pt-0">
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
