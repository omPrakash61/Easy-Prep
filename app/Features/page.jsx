"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  BookOpen,
  Users,
  BarChart2,
  Cpu,
  Rocket,
  Menu,
  Sparkles,
  Youtube,
  YoutubeIcon,
  Brain,
  Laugh,
  FileQuestion,
  Award,
  User,
} from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-950 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-16">
            <div className="absolute left-0 inset-y-0 flex items-center sm:static sm:inset-auto">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
                  <Rocket className="w-5 h-5" />
                </div>
                <span className="hidden sm:inline-block font-sans font-bold text-xl">
                  Easy-Prep
                </span>
              </Link>
            </div>

            <nav className="mx-auto hidden md:flex items-center gap-5">
              <Link
                href="/Features"
                className="text-sm font-medium py-2 px-3 hover:border-1 hover:border-purple-400 rounded-lg  hover:text-purple-600 transition"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium hover:text-purple-600 transition py-2 px-3 hover:border-1 hover:border-purple-400 rounded-lg"
              >
                How it works
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium hover:text-purple-600 transition py-2 px-3 hover:border-1 hover:border-purple-400 rounded-lg"
              >
                Pricing
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium hover:text-purple-600 transition py-2 px-3 hover:border-1 hover:border-purple-400 rounded-lg"
              >
                About
              </Link>
            </nav>

            <div className="absolute right-0 inset-y-0 flex items-center gap-3">
              <Link href="/pricing" className="hidden sm:inline-block">
                <Button variant="ghost" className="text-sm">
                  Pricing
                </Button>
              </Link>

              <Link href="/sign-in" className="hidden sm:inline-block">
                <Button className="text-sm">Sign in</Button>
              </Link>

              <button
                className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
                onClick={() => setMobileOpen((s) => !s)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              <Link
                href="#features"
                className="block px-3 py-2 rounded-md hover:bg-purple-50"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="block px-3 py-2 rounded-md hover:bg-purple-50"
              >
                How it works
              </Link>
              <Link
                href="#pricing"
                className="block px-3 py-2 rounded-md hover:bg-purple-50"
              >
                Pricing
              </Link>
              <Link
                href="/sign-in"
                className="block px-3 py-2 rounded-md bg-purple-600 text-white text-center"
              >
                Sign in
              </Link>
            </div>
          </div>
        )}
      </header>
      <main>
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-32 text-center overflow-hidden">
          {/* Background gradient blobs */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="container mx-auto px-6 sm:px-12 relative z-10">
            {/* Hero Heading */}
            <h1 className="text-5xl sm:text-6xl font-sans md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent leading-tight drop-shadow-md">
              Master Your Learning, Powered by AI
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-700 dark:text-gray-200 font-light">
              Create your own courses, discover the best YouTube content, and
              track your progress with personalized AI insights.
              <span className="font-semibold">
                {" "}
                Smarter learning starts here.
              </span>
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white"
              >
                Start Your Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all"
              >
                Learn More
              </Button>
            </div>

            {/* Supporting Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 text-left max-w-4xl mx-auto">
              <div className="p-6 bg-white/70 dark:bg-gray-900/40 rounded-xl shadow-md hover:shadow-lg transition-all">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-600 dark:text-purple-400">
                  📚 Create
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  Build personalized courses with AI that adapts to your
                  learning style.
                </p>
              </div>
              <div className="p-6 bg-white/70 dark:bg-gray-900/40 rounded-xl shadow-md hover:shadow-lg transition-all">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-pink-600 dark:text-pink-400">
                  🎥 Learn
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  Discover curated YouTube content and interactive resources
                  instantly.
                </p>
              </div>
              <div className="p-6 bg-white/70 dark:bg-gray-900/40 rounded-xl shadow-md hover:shadow-lg transition-all">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  📊 Track
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  Monitor your progress with real-time insights and personalized
                  goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid - Expanded and Detailed */}

        {/* Feature Grid - Expanded and Detailed */}
        

        {/* How It Works - Step-by-Step with Icons and Imagery */}
        

        {/* Testimonials or Social Proof Section */}
        <section className="py-20 md:py-24 px-6 sm:px-12 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              What Our Users Say
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              Hear from people who are already transforming their learning
              journey with our AI-powered platform.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <Card className="p-6 shadow-xl rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                {/* Shady background for the card */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 opacity-100"></div>
                <div className="relative z-10 flex items-center mb-4">
                  <User className="m-3 p-3 w-12 h-12 bg-gray-100 rounded-sm" />

                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Alex R.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Student
                    </p>
                  </div>
                </div>
                <p className="relative z-10 italic text-gray-700 dark:text-gray-300">
                  "The AI-generated courses are a game-changer. I went from
                  knowing nothing to building a full course in minutes. This
                  platform is incredibly intuitive and powerful."
                </p>
              </Card>

              {/* Testimonial 2 */}
              <Card className="p-6 shadow-xl rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                {/* Shady background for the card */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 opacity-100"></div>
                <div className="relative z-10 flex items-center mb-4">
                  <User className="p-3 m-3 w-12 h-12 bg-gray-100 rounded-sm" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Maria S.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Developer
                    </p>
                  </div>
                </div>
                <p className="relative z-10 italic text-gray-700 dark:text-gray-300">
                  "I love the progress tracking. Seeing my progress visualized
                  keeps me motivated. The curated YouTube videos save me so much
                  time!"
                </p>
              </Card>

              {/* Testimonial 3 */}
              <Card className="p-6 shadow-xl rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                {/* Shady background for the card */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 opacity-100"></div>
                <div className="relative z-10 flex items-center mb-4">
                  <User className="my-3 p-3 mx-3 w-12 h-12 bg-gray-100 rounded-sm" />

                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Ben L.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Hobbyist
                    </p>
                  </div>
                </div>
                <p className="relative z-10 italic text-gray-700 dark:text-gray-300">
                  "Learning has always felt like a chore, but this platform
                  makes it fun. The interactive elements and quizzes make every
                  session engaging."
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section - Final push */}
        <section className="relative w-full py-24 md:py-32 px-6 sm:px-12 text-center bg-gradient-to-r from-purple-600 to-pink-500 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-pattern-dots -z-10"></div>{" "}
          {/* Optional: Add a subtle pattern */}
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-md">
              Ready to Revolutionize Your Learning?
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl font-light mb-10 drop-shadow-sm">
              Join thousands of learners who are using AI to master new skills
              faster and more effectively. Your future starts now.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="px-8 py-4 text-lg font-bold rounded-full text-purple-600 dark:text-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started for Free
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
